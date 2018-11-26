import { IGraphPlugin } from '../../types';
import { createYamlHook } from './hook';

export const createYamlPlugin = (): IGraphPlugin => ({
  hooks: [createYamlHook()],
});
