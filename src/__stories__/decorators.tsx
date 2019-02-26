import * as React from 'react';

import { boolean, number, select, text } from '@storybook/addon-knobs/react';

import { ThemeZone } from '../theme';

import { DiagnosticMessagesContext, IDiagnosticMessagesProvider } from '../components/DiagnosticMessagesContext';

export const Tooltips = (storyFn: Function) => {
  const getMessages: IDiagnosticMessagesProvider = path => {
    const summary = text('message', '');
    if (summary === '') return [];
    if (path.length > 0) return [];
    return [
      {
        summary: text('message', ''),
        severity: number('severity', 40),
        severityLabel: select('severityLabel', ['warn', 'anything-other-than-warn'], 'warn'),
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
            summary: path.join(' > '),
            severity: number('severity', 0),
            severityLabel: select('severityLabel', ['warn', 'anything-other-than-warn'], 'anything-other-than-warn'),
          },
        ]
      : [];
  };
  return <DiagnosticMessagesContext.Provider value={getMessages}>{storyFn()}</DiagnosticMessagesContext.Provider>;
};

export const Theme = (storyFn: Function) => <ThemeZone name="formtron">{storyFn()}</ThemeZone>;
