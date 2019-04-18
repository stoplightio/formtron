import * as React from 'react';

import { JsonPath } from '@stoplight/types';
import { Box, Popup } from '@stoplight/ui-kit';
import { Tooltip } from '@stoplight/ui-kit/Tooltip';

import { useDiagnostics } from './hooks';

interface IMessages {
  path: JsonPath;
}

export const Messages: React.FunctionComponent<IMessages> = ({ path, children }) => {
  const { messages, variant } = useDiagnostics(path);
  const message = messages.map(m => m.summary || m.message).join(' | ');
  const showTooltip = message != null && message !== '';
  return (
    <Popup
      posX="left"
      posY="top"
      padding={3}
      renderContent={() =>
        showTooltip && (
          <Tooltip posX="left" variant={variant}>
            {message}
          </Tooltip>
        )
      }
      renderTrigger={() => <Box>{children}</Box>}
    />
  );
};

Messages.displayName = 'Messages';
