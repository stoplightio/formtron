import * as React from 'react';

export interface IDiagnosticMessage {
  severity: number;
  severityLabel: string;
  summary: string;
}

export type IDiagnosticMessagesProvider = (path: string[]) => IDiagnosticMessage[];

export const DiagnosticMessagesContext = React.createContext<IDiagnosticMessagesProvider>(() => []);
