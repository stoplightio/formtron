import * as React from 'react';

import { Button, IButton, Icon } from '@stoplight/ui-kit';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IIconButton extends IButton {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  icon: IconDefinition;
}

export const IconButton: React.FunctionComponent<IIconButton> = ({ disabled = false, onClick, icon }) => {
  return (
    <Button
      borderColor="transparent"
      backgroundColor="transparent"
      height="100%"
      fontSize="15px"
      px={0}
      py={0}
      onClick={onClick}
      disabled={disabled}
      color="rgb(118, 130, 143)"
      css={{
        ':hover': {
          backgroundColor: 'transparent',
          color: '#1E2537',
        },
        ':active': {
          backgroundColor: 'transparent',
          fontSize: '17px',
        },
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
};
