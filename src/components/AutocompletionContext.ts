import { Dictionary } from '@stoplight/types';
import * as React from 'react';

export interface IAutocompletionOption {
  value: any;
  label: string;
}
export type IAutocompletionProvider = (inputValue: string) => Promise<IAutocompletionOption[]>;

export type IAutocompletionSources = Dictionary<IAutocompletionProvider>;

export const AutocompletionContext: React.Context<IAutocompletionSources> = React.createContext({});
