import * as React from 'react';

// @ts-ignore
import * as ObjectInspector from 'react-object-inspector';

import { Button } from '@stoplight/ui-kit';
import { boolean } from '@storybook/addon-knobs/react';

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

export const FormtronDebugger: React.FC<IFormtronDebugger> = ({ input, schema, selection: _selection }) => {
  const initialForm = deriveFormData(schema, input, _selection);
  const initialOutput = applyOps(input, []);
  const [ops, setOps] = React.useState([] as IOperation[]);
  const [data, setData] = React.useState(input);
  const [selection, setSelection] = React.useState(_selection);
  const [formData, setFormData] = React.useState(initialForm);
  const [previewOutput, setPreviewOutput] = React.useState(initialOutput);
  const _onChange = React.useCallback(
    ops => {
      const previewOutput = applyOps(data, ops);
      setOps(ops);
      setPreviewOutput(previewOutput);
    },
    [setOps, applyOps, setPreviewOutput]
  );
  const _onInternalChange = React.useCallback(
    (form: any) => {
      setFormData(form);
    },
    [setFormData]
  );
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
              <label>Selection Path: {selection}</label>
              <ObjectInspector
                data={data}
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
              <ObjectInspector data={schema} name="schema" initialExpandedPaths={['root', 'root.*']} />
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
                <ObjectInspector data={initialForm} name="form" initialExpandedPaths={[]} />
              </fieldset>
              <fieldset>
                <legend>Form Data Out</legend>
                <ObjectInspector data={formData} name="form" initialExpandedPaths={[]} />
              </fieldset>
            </div>
            <hr style={{ borderTop: '1px dashed black' }} />
            <Formtron
              fieldComponents={{ ...fieldComponents, ...customWidgets }}
              value={data}
              schema={schema}
              selection={selection}
              onChange={_onChange}
              onInternalChange={_onInternalChange}
              disabled={boolean('disabled', false)}
              layout="default"
            />
            <Button
              type="button"
              onClick={() => {
                const warnings = computeWarnings(data, ops);
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
                const _data = applyOps(data, ops);
                const selectOp = ops.find(x => x.op === 'select');
                setOps([]);
                setData(_data);
                setSelection(selectOp ? selectOp.path : selection);
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
                data={ops}
                name="ops"
                initialExpandedPaths={['root', 'root.0', 'root.1', 'root.2', 'root.3']}
              />
              <ObjectInspector
                data={previewOutput}
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
};
