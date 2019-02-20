/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { Box, Popup } from '@stoplight/ui-kit';

import { Callout } from './Callout';

interface ITooltip {
  message: React.ReactNode;
  invalid: boolean;
}

export const Tooltip: React.FunctionComponent<ITooltip> = ({ invalid, message, children }) => {
  if (message == null || message === '') {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <Popup
      posX="center"
      posY="top"
      padding={3}
      renderContent={() => <Callout invalid={invalid}>{message}</Callout>}
      renderTrigger={() => <Box>{children}</Box>}
    />
  );
};

Tooltip.displayName = 'Tooltip';
