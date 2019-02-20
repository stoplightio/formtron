/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Popup } from '@stoplight/ui-kit';

import { Callout } from './Callout';

import { FormtronComponentVariant } from '../types';

interface IMessages {
  messages?: string[];
  variant?: FormtronComponentVariant;
}

export const Messages: React.FunctionComponent<IMessages> = ({ variant, messages = [], children }) => {
  const message = messages.join('');
  if (message == null || message === '') {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <Popup
      posX="center"
      posY="top"
      padding={3}
      renderContent={() => <Callout variant={variant}>{message}</Callout>}
      renderTrigger={() => <Box>{children}</Box>}
    />
  );
};

Messages.displayName = 'Messages';
