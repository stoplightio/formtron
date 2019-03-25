import { JsonPath } from '@stoplight/types';
import * as React from 'react';
import { IFormtronDiagnostic } from '../types';

export type IDiagnosticMessagesProvider = (path: JsonPath) => IFormtronDiagnostic[];

export const DiagnosticMessagesContext = React.createContext<IDiagnosticMessagesProvider>(() => []);
