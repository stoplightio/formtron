import * as React from 'react';

import { Dictionary } from 'ts-essentials';

export interface IAutocompletionOption {
  value: any;
  label: string;
}
export type IAutocompletionProvider = (inputValue: string) => Promise<IAutocompletionOption[]>;

export type IAutocompletionSources = Dictionary<IAutocompletionProvider>;

export const AutocompletionContext: React.Context<IAutocompletionSources> = React.createContext({});
