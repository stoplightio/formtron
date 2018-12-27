/* @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from '@stoplight/ui-kit';

interface IValidityIndicator {
  state: boolean | null;
}

export const ValidityIndicator: React.FunctionComponent<IValidityIndicator> = ({ state }) => {
  if (state === false) {
    return (
      <Box display="inline-block" pl={1} color="#8b0000">
        *
      </Box>
    );
  } else if (state === true) {
    return (
      <Box display="inline-block" pl={1} color="#009000">
        ✓
      </Box>
    );
  } else {
    return <Box />;
  }
};
