import * as React from 'react';

import { boolean, select, text } from '@storybook/addon-knobs/react';

import { ThemeZone } from '../theme';

import { DiagnosticMessagesContext, IDiagnosticMessagesProvider } from '../components/DiagnosticMessagesContext';

export const Tooltips = (storyFn: Function) => {
  const getMessages: IDiagnosticMessagesProvider = path => {
    const summary = text('message', '');
    if (summary === '') return [];
    if (path.length > 0) return [];
    return [
      {
        message: text('message', ''),
        // Will wanted it to be less TypeScript-ish hence numbers are listed
        severity: select('severity', [0, 1, 2, 3], 1),
      },
    ];
  };
  return <DiagnosticMessagesContext.Provider value={getMessages}>{storyFn()}</DiagnosticMessagesContext.Provider>;
};

export const PathTooltips = (storyFn: Function) => {
  const getMessages: IDiagnosticMessagesProvider = path => {
    return boolean('show path tooltips', false)
      ? [
          {
            message: path.join(' > '),
            // Will wanted it to be less TypeScript-ish hence numbers are listed
            severity: select('severity', [0, 1, 2, 3], 1),
          },
        ]
      : [];
  };
  return <DiagnosticMessagesContext.Provider value={getMessages}>{storyFn()}</DiagnosticMessagesContext.Provider>;
};

export const Theme = (storyFn: Function) => <ThemeZone name="formtron">{storyFn()}</ThemeZone>;
