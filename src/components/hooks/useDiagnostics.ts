import { useContext } from 'react';

import { FormtronComponentVariant } from '../../types';

import { DiagnosticMessagesContext } from '../DiagnosticMessagesContext';

export const useDiagnostics = (path: string[]) => {
  const getMessages = useContext(DiagnosticMessagesContext);
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
