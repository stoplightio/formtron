import { IGraphPlugin } from '../../types';
import { createJsonHook } from './hook';

export const createJsonPlugin = (): IGraphPlugin => ({
  hooks: [createJsonHook()],
});
