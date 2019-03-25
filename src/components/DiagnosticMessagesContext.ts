import { IDiagnostic, JsonPath } from '@stoplight/types';
import * as React from 'react';

export type IDiagnosticMessagesProvider = (path: JsonPath) => IDiagnostic[];

export const DiagnosticMessagesContext = React.createContext<IDiagnosticMessagesProvider>(() => []);
