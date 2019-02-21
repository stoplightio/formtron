import * as React from 'react';

const capitalize = require('lodash/capitalize');

import { useTheme } from '../theme';
import { FormtronComponentVariant } from '../types';

import { DiagnosticMessagesContext } from './DiagnosticMessagesContext';

const useProp = (prop: string) => (variant?: FormtronComponentVariant) => {
  const theme = useTheme();
  const _prop = variant ? (variant as string) + capitalize(prop) : prop;
  if (!theme.input || !theme.input[_prop]) return;
  return theme.input[_prop];
};

export const useBorder = useProp('border');

export const useFg = useProp('fg');

export const useBg = useProp('bg');

export const useDiagnostics = (path: string[]) => {
  const getMessages = React.useContext(DiagnosticMessagesContext);
  const messages = getMessages(path);
  let severity = -1;
  let severityLabel = '';
  for (const message of messages) {
    if (message.severity > severity) {
      severity = message.severity;
      severityLabel = message.severityLabel;
    }
  }
  let variant: FormtronComponentVariant = '';
  if (severityLabel === 'warn') {
    variant = 'invalid';
  }
  return { variant, messages };
};
