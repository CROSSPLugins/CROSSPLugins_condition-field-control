(($PLUGIN_ID) => {
  kintone.events.on('app.record.index.show', (event) => {
    const config = kintone.plugin.app.getConfig($PLUGIN_ID);
    console.log('config:', config);
  });
})(kintone.$PLUGIN_ID);
