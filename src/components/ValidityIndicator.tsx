/* @jsx jsx */
import { jsx } from '@emotion/core';

interface IValidityIndicator {
  state: boolean | null;
}

export const ValidityIndicator: React.SFC<IValidityIndicator> = ({ state }) => {
  if (state === false) {
    return (
      <span
        style={{
          paddingLeft: '5px',
          color: '#8b0000',
        }}
      >
        *
      </span>
    );
  } else if (state === true) {
    return (
      <span
        style={{
          paddingLeft: '5px',
          color: '#009000',
        }}
      >
        ✓
      </span>
    );
  } else {
    return <span />;
  }
};
