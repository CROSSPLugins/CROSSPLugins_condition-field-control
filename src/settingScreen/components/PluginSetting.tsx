import { css } from '@emotion/react';
import FieldControlList from './FieldControlList';

const style = {
  container: css({
    height: '100%',
    backgroundColor: '#F7F9FA',
    padding: '1rem'
  }),
  buttons: css({
    '.kintoneplugin-button-normal': {
      marginRight: '10px'
    }
  }),
  toggle: (_: boolean) => !_ && css({ display: 'none'})
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

export default (props: { show: boolean }) => {
  return (
    <div css={[style.container, style.toggle(props.show)]}>
      <FieldControlList />
      <div css={style.buttons}>
        <button className='kintoneplugin-button-normal'>キャンセル</button>
        <button className='kintoneplugin-button-dialog-ok' onClick={savePluginSettings}>
          保存
        </button>
      </div>
    </div>
  );
};
