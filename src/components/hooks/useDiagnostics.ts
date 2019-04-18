import { DiagnosticSeverity, Dictionary, JsonPath } from '@stoplight/types';
import { Variant } from '@stoplight/ui-kit/types';
import { useContext } from 'react';

import { IFormtronDiagnostic } from '../../types';
import { DiagnosticMessagesContext, IDiagnosticMessagesProvider } from '../DiagnosticMessagesContext';

const variantsMap: Dictionary<Variant, DiagnosticSeverity> = {
  [DiagnosticSeverity.Hint]: Variant.Default,
  [DiagnosticSeverity.Information]: Variant.Default,
  [DiagnosticSeverity.Error]: Variant.Invalid,
  [DiagnosticSeverity.Warning]: Variant.Warning,
};

export type UseDiagnostics = (
  path: JsonPath
) => {
  variant: Variant;
  messages: IFormtronDiagnostic[];
};

export const useDiagnostics: UseDiagnostics = path => {
  const getMessages = useContext<IDiagnosticMessagesProvider>(DiagnosticMessagesContext);
  const messages = getMessages(path);
  const severity = Math.min(...messages.map(({ severity }) => severity));

  return { variant: variantsMap[severity], messages };
};
