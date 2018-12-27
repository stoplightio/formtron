/* @jsx jsx */
import { jsx } from '@emotion/core';

import { addDecorator } from '@storybook/react';
// @ts-ignore
import { ThemeZone } from '../../.storybook/theme.js';
// @ts-ignore
addDecorator(storyFn => <ThemeZone name="formtron">{storyFn()}</ThemeZone>);
