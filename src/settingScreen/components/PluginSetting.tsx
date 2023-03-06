import { css } from '@emotion/react';

const style = {
  container: css({
    height: '100%'
  }),
  setting: css({
    height: '85%'
  }),
  buttons: css({
    height: '15%',
    '.kintoneplugin-button-normal': {
      marginRight: '10px'
    }
  })
};

const savePluginSettings = () => {
  kintone.plugin.app.setConfig(
    {
      // ライセンスキー
      licensekey: 'XXXX-XXXX-XXXX-XXXX'
      // カスタマイズ(ユーザ画面)に関する設定は各プラグインで追加する
      // customizeSettings: 'サンプル設定'
    },
    () => {
      console.log('設定完了');
    }
  );
};

export default () => {
  return (
    <div css={style.container}>
      <div css={style.setting}>各プラグインでの設定</div>
      <div css={style.buttons}>
        <button className='kintoneplugin-button-normal'>キャンセル</button>
        <button className='kintoneplugin-button-dialog-ok' onClick={savePluginSettings}>
          保存
        </button>
      </div>
    </div>
  );
};
