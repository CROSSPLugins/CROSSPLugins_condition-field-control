import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App';

(($PLUGIN_ID) => {
  const root = createRoot(document.getElementById('app') as HTMLElement);
  root.render(
    <RecoilRoot>
      <App pluginId={$PLUGIN_ID}></App>
    </RecoilRoot>
  );
})(kintone.$PLUGIN_ID);
