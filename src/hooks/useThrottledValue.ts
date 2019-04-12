import * as React from 'react';

import throttle = require('lodash/throttle');

import { useDraftValue } from './useDraftValue';

export type OnChange = (value: any) => void;
export type UseThrottleValue = (value: any, onChange: OnChange, ms: number) => [any, OnChange, any];

export const useThrottledValue: UseThrottleValue = (value, givenOnChange, ms = 1000) => {
  const _onChange = React.useCallback(throttle(draft => givenOnChange(draft), ms), [ms, givenOnChange]);
  return useDraftValue(value, _onChange);
};
