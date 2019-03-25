import { DiagnosticSeverity, IRange } from '@stoplight/types';
import * as React from 'react';

import { boolean, number, text } from '@storybook/addon-knobs/react';

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
        severity: number('severity', DiagnosticSeverity.Warning),
        range: {} as IRange,
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
            severity: number('severity', DiagnosticSeverity.Warning),
            range: {} as IRange,
          },
        ]
      : [];
  };
  return <DiagnosticMessagesContext.Provider value={getMessages}>{storyFn()}</DiagnosticMessagesContext.Provider>;
};

export const Theme = (storyFn: Function) => <ThemeZone name="formtron">{storyFn()}</ThemeZone>;
