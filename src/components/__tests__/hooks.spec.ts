import * as React from 'react';
import { useDiagnostics } from '../hooks/useDiagnostics';

jest.mock('react');
jest.mock('../DiagnosticMessagesContext');

const getMessages = jest.fn(() => [
  {
    severity: 10,
    severityLabel: 'warn',
    summary: 'An error happened',
    message: 'Cannot foobar undefines',
  },
]);
// @ts-ignore
React.useContext.mockImplementation(() => getMessages);

describe('useDiagnostics', () => {
  it('should determine variant', () => {
    const { variant, messages } = useDiagnostics(['foo', 'bar']);
    expect(getMessages).toBeCalledWith(['foo', 'bar']);
    expect(variant).toBe('invalid');
    expect(messages).toEqual([
      {
        severity: 10,
        severityLabel: 'warn',
        summary: 'An error happened',
        message: 'Cannot foobar undefines',
      },
    ]);
  });
});
