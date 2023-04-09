import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import FieldControlList from './FieldControlList';
import { fieldControlList } from '../store';
import { PluginSetting } from '../../type';

const style = {
  container: css({
    position: 'relative',
    backgroundColor: '#F7F9FA',
    padding: '1rem',
    boxSizing: 'border-box',
    minHeight: '600px',
    '>:nth-last-of-type(2)': {
      marginBottom: '6rem'
    }
  }),
  buttons: css({
    position: 'absolute',
    bottom: '2rem',
    '.kintoneplugin-button-normal': {
      marginRight: '10px'
    }
  }),
  toggle: (_: boolean) => !_ && css({ display: 'none'})
};

export default (props: { show: boolean }) => {
  const _fieldControlList = useRecoilValue(fieldControlList);

  const savePluginSettings = () => {
    // ValueCheck

    const pluginSetting: PluginSetting = {
      systemSetting: { _: {} },
      customizeSetting: {
        fieldControlList: _fieldControlList.map(e => ({
          targetField: e.targetField.value,
          controlType: e.controlType.value,
          config: e.config.map(f => ({
            field: f.field.value,
            op: f.op.value,
            value: f.value.value
          }))
        }))
      }
    };
    kintone.plugin.app.setConfig(
      pluginSetting,
      () => {
        console.log('設定完了');
      }
    );
  };

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
