import * as React from 'react';

import { boolean, text } from '@storybook/addon-knobs/react';

import { ThemeZone } from '../theme';

import { DiagnosticMessagesContext, IDiagnosticMessagesProvider } from '../components/DiagnosticMessagesContext';

export const Tooltips = (storyFn: Function) => {
  const getMessages: IDiagnosticMessagesProvider = path =>
    path.length === 0 ? [{ summary: text('message', '') }] : [];
  return <DiagnosticMessagesContext.Provider value={getMessages}>{storyFn()}</DiagnosticMessagesContext.Provider>;
};

export const PathTooltips = (storyFn: Function) => {
  const getMessages: IDiagnosticMessagesProvider = path => {
    return boolean('show path tooltips', false) ? [{ summary: path.join(' > ') }] : [];
  };
  return <DiagnosticMessagesContext.Provider value={getMessages}>{storyFn()}</DiagnosticMessagesContext.Provider>;
};

export const Theme = (storyFn: Function) => <ThemeZone name="formtron">{storyFn()}</ThemeZone>;
