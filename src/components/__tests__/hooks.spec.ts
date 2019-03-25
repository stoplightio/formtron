import { DiagnosticSeverity } from '@stoplight/types';
import * as React from 'react';
import { useDiagnostics } from '../hooks/useDiagnostics';
import { Variant } from '../types';

jest.mock('react');
jest.mock('../DiagnosticMessagesContext');

const getMessages = jest.fn(() => [
  {
    severity: DiagnosticSeverity.Error,
    message: 'Cannot foobar undefines',
  },
]);

(React.useContext as jest.Mock).mockImplementation(() => getMessages);

describe('useDiagnostics', () => {
  it('should determine variant', () => {
    const { variant, messages } = useDiagnostics(['foo', 'bar']);
    expect(getMessages).toBeCalledWith(['foo', 'bar']);
    expect(variant).toBe(Variant.invalid);
    expect(messages).toEqual([
      {
        severity: DiagnosticSeverity.Error,
        message: 'Cannot foobar undefines',
      },
    ]);
  });
});
