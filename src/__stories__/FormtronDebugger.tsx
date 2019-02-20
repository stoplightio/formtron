import * as React from 'react';

// @ts-ignore
import * as ObjectInspector from 'react-object-inspector';

import { Button } from '@stoplight/ui-kit';

import { applyOps, computeWarnings, deriveFormData, Formtron, IOperation } from '../';
import { AutocompletionContext, fieldComponents } from '../components';
import { autocompletionSources } from './autocompletionSources';
import { customWidgets } from './customWidgets';

export interface IFormtronDebugger {
  input: any;
  schema: any;
  selection: string;
}
export interface IFormtronDebuggerState {
  initialForm: any;
  selection: string;
  form: any;
  ops: IOperation[];
  data: any;
  previewOutput: any;
}

export class FormtronDebugger extends React.Component<IFormtronDebugger, IFormtronDebuggerState> {
  public constructor(props: IFormtronDebugger) {
    super(props);
    const { input, schema, selection } = props;
    const initialForm = deriveFormData(schema, input, selection);
    const initialOutput = applyOps(input, []);
    this.state = {
      initialForm,
      selection,
      form: initialForm,
      ops: [],
      data: input,
      previewOutput: initialOutput,
    };
  }
  public render() {
    return (
      <AutocompletionContext.Provider value={autocompletionSources}>
        <div className="App">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
            <section
              style={{
                gridArea: '1 / 1 / 2 / 2',
                border: '1px solid black',
                borderRadius: 5,
              }}
            >
              <legend>Input</legend>
              <fieldset>
                <legend>Source Data</legend>
                <label>Selection Path: {this.state.selection}</label>
                <ObjectInspector
                  data={this.state.data}
                  name="data"
                  initialExpandedPaths={[
                    'root',
                    'root.info',
                    'root.info.*',
                    'root.schemes',
                    'root.paths',
                    'root.paths./todos',
                    'root.paths./todos.put',
                    'root.paths./todos.put.*',
                    'root.200',
                    'root.200.*',
                  ]}
                />
              </fieldset>
              <fieldset>
                <legend>Form Schema</legend>
                <ObjectInspector data={this.props.schema} name="schema" initialExpandedPaths={['root', 'root.*']} />
              </fieldset>
            </section>
            <section
              style={{
                gridArea: '1 / 2/ 2 / 3',
                border: '1px solid black',
                borderRadius: 5,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <fieldset>
                  <legend>Form Data In</legend>
                  <ObjectInspector data={this.state.initialForm} name="form" initialExpandedPaths={[]} />
                </fieldset>
                <fieldset>
                  <legend>Form Data Out</legend>
                  <ObjectInspector data={this.state.form} name="form" initialExpandedPaths={[]} />
                </fieldset>
              </div>
              <hr style={{ borderTop: '1px dashed black' }} />
              <Formtron
                fieldComponents={{ ...fieldComponents, ...customWidgets }}
                value={this.state.data}
                schema={this.props.schema}
                selection={this.state.selection}
                onChange={ops => {
                  const previewOutput = applyOps(this.state.data, ops);
                  this.setState(state => ({ ...state, ops, previewOutput }));
                }}
                onInternalChange={(form: any) => {
                  this.setState(state => ({ ...state, form }));
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  const warnings = computeWarnings(this.state.data, this.state.ops);
                  if (warnings.length > 0) {
                    for (const warning of warnings) {
                      const parts = warning.op.path.split('.');
                      if (parts.length === 3) {
                        const res = window.confirm(
                          `There is already a "${parts[2]}" response defined on "${parts[1]}", overwrite it?`
                        );
                        if (!res) return;
                      } else if (parts.length === 2) {
                        const res = window.confirm(`There is already a "${parts[1]}" route defined, overwrite it?`);
                        if (!res) return;
                      }
                    }
                  }
                  const data = applyOps(this.state.data, this.state.ops);
                  const selectOp = this.state.ops.find(x => x.op === 'select');
                  const selection = selectOp ? selectOp.path : this.state.selection;
                  this.setState(state => ({
                    ...state,
                    ops: [],
                    data,
                    selection,
                  }));
                }}
              >
                Apply
              </Button>
            </section>
            <section
              style={{
                gridArea: '1 / 3 / 2 / 4',
                border: '1px solid black',
                borderRadius: 5,
              }}
            >
              <legend>Output</legend>
              <fieldset>
                <legend>Result</legend>
                <ObjectInspector
                  data={this.state.ops}
                  name="ops"
                  initialExpandedPaths={['root', 'root.0', 'root.1', 'root.2', 'root.3']}
                />
                <ObjectInspector
                  data={this.state.previewOutput}
                  name="output"
                  initialExpandedPaths={[
                    'root',
                    'root.info',
                    'root.info.*',
                    'root.schemes',
                    'root.paths',
                    'root.paths.*',
                    'root.paths.*.*',
                    'root.paths.*.*.*',
                    'root.200',
                    'root.200.*',
                  ]}
                />
              </fieldset>
            </section>
          </div>
        </div>
      </AutocompletionContext.Provider>
    );
  }
}
