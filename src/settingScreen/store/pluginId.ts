import { atom } from 'recoil';

const pluginId = atom({
  key: 'pluginId',
  default: ''
});

export { pluginId };