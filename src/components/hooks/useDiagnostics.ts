import { DiagnosticSeverity, IDiagnostic, JsonPath } from '@stoplight/types';
import { useContext } from 'react';

import { DiagnosticMessagesContext, IDiagnosticMessagesProvider } from '../DiagnosticMessagesContext';
import { Variant } from '../types';

export type UseDiagnostics = (
  path: JsonPath
) => {
  variant: Variant;
  messages: IDiagnostic[];
};

export const useDiagnostics: UseDiagnostics = path => {
  const getMessages = useContext<IDiagnosticMessagesProvider>(DiagnosticMessagesContext);
  const messages = getMessages(path);
  const severity = Math.min(...messages.map(({ severity }) => severity));

  let variant: Variant = Variant.normal;
  if (severity === DiagnosticSeverity.Error || severity === DiagnosticSeverity.Warning) {
    variant = Variant.invalid;
  }
  return { variant, messages };
};
