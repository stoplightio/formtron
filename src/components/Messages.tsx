/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Popup } from '@stoplight/ui-kit';

import { Callout } from './Callout';
import { useDiagnostics } from './hooks';

interface IMessages {
  path: string[];
}

export const Messages: React.FunctionComponent<IMessages> = ({ path, children }) => {
  const { messages, variant } = useDiagnostics(path);
  const message = messages.map(m => m.summary || m.message).join(' | ');
  const showTooltip = message != null && message !== '';
  return (
    <Popup
      posX="center"
      posY="top"
      padding={3}
      renderContent={() => showTooltip && <Callout variant={variant}>{message}</Callout>}
      renderTrigger={() => <Box>{children}</Box>}
    />
  );
};

Messages.displayName = 'Messages';
