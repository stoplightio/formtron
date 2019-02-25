import { useContext } from 'react';

import { DiagnosticMessagesContext } from '../DiagnosticMessagesContext';
import { Variant } from '../types';

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
  let variant: Variant = Variant.normal;
  if (severityLabel === 'warn') {
    variant = Variant.invalid;
  }
  return { variant, messages };
};
