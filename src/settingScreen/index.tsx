import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App';

(($PLUGIN_ID) => {
  console.log('config:', kintone.plugin.app.getConfig($PLUGIN_ID));
  const root = createRoot(document.getElementById('app') as HTMLElement);
  root.render(
    <RecoilRoot>
      <App></App>
    </RecoilRoot>
  );
})(kintone.$PLUGIN_ID);
