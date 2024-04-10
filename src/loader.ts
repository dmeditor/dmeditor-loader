// import { registerWidget } from 'dmeditor';
import { loadRemote } from '@module-federation/enhanced/runtime';

export const loadWidgets = (...args: Parameters<typeof loadRemote>) => {
  return loadRemote(...args);
};
