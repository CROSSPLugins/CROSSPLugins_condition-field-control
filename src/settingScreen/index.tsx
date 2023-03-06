import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

(($PLUGIN_ID) => {
  console.log('config:', kintone.plugin.app.getConfig($PLUGIN_ID));
  const root = createRoot(document.getElementById('app') as HTMLElement);
  root.render(
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  );
})(kintone.$PLUGIN_ID);
