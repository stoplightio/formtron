import { IAutocompletionProvider, IAutocompletionSources } from '../components';

// This emulates the async-ness if (say) looking up these values from
// a remote HTTP API.

// I love this guy.
async function sleep(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

function genericAsyncResults(defaults: string[]): IAutocompletionProvider {
  return async (inputValue: string) => {
    await sleep(1000);
    if (!inputValue) {
      return [
        {
          value: null,
          label: 'Showing first 2 results. Enter search keyword for more.',
        },
        ...defaults.map(v => ({ value: v, label: v })),
      ];
    } else {
      return [
        {
          value: inputValue,
          label: inputValue,
        },
        {
          value: `alt_${inputValue}`,
          label: `alt_${inputValue}`,
        },
        {
          value: `${inputValue}-v2`,
          label: `${inputValue}-v2`,
        },
        {
          value: `${inputValue}-v3`,
          label: `${inputValue}-v3`,
        },
      ];
    }
  };
}

export const autocompletionSources: IAutocompletionSources = {
  tags: genericAsyncResults(['Todos', 'Admin']),
  models: genericAsyncResults(['TodoItem', 'TodoStatus']),
};
