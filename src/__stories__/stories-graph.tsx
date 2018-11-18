import * as React from 'react';

import * as _ from 'lodash';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';

// @ts-ignore
import { text } from '@storybook/addon-knobs/react';

// @ts-ignore
import * as ObjectInspector from 'react-object-inspector';

import { applyOps, Formtron } from '../';
import { fieldComponents } from '../components';

import { Defer } from './Defer';
// import { FormtronDebugger } from './FormtronDebugger';
import { getNodes } from './initGraph';
import { State } from './State';

const oas2schema = require('./examples/oas2/schema.json');

const FormtronLight = ({ value }: { value: any }) => (
  <State initialState={value}>
    {(innerValue: any, setValue: any) => (
      <Formtron
        fieldComponents={fieldComponents}
        value={innerValue}
        schema={oas2schema}
        selection={'.'}
        onChange={ops => {
          const previewOutput = applyOps(innerValue, ops);
          setValue(previewOutput);
        }}
      />
    )}
  </State>
);

storiesOf('formtron-graph', module)
  .addDecorator(withKnobs)
  .add('active node', () => {
    return (
      <State<string> initialState="">
        {(activeId: string, setActiveId: any) => (
          <Defer promise={getNodes()}>
            {(data: any) => {
              const activeNode = data && data.find((x: any) => x.id === activeId);
              console.log('data.length', data && data.length);
              console.log(data && data.find((x: any) => x.contentType === 'oas2'));
              return (
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 300 }} className="border border-grey">
                    {data &&
                      data.map((x: any) => (
                        <div
                          key={x.id}
                          onClick={e => setActiveId(x.id)}
                          style={{
                            backgroundColor: x.id === activeId ? 'aliceblue' : '',
                          }}
                        >
                          {x.id}
                        </div>
                      ))}
                  </div>
                  <div style={{}} className="border border-grey">
                    <div style={{ position: 'relative' }}>
                      <ObjectInspector
                        key={activeId}
                        name={activeId}
                        data={activeNode || {}}
                        initialExpandedPaths={['root', 'root.content']}
                      />
                      {activeNode &&
                        activeNode.contentType === 'oas2' && <FormtronLight value={activeNode.content.data} />}
                    </div>
                  </div>
                </div>
              );
            }}
          </Defer>
        )}
      </State>
    );
  });
