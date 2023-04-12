import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import FieldControlList from './FieldControlList';
import { fieldControlList } from '../store';
import { PluginSetting } from '../../type';
import { deepcp } from '../utils';

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
  const [list, setList] = useRecoilState(fieldControlList);

  const checkSetting = (): boolean => {
    let isCorrect = true;

    // fieldControlList check
    const _list = deepcp(list).map(e => {
      // targetField
      if(e.targetField.value === null) {
        isCorrect = false;
        e.targetField.fieldError = true;
        e.targetField.errorText = '設定してください';
      }
      // controlType 特になし
      // config
      return {
        ...e,
        config: e.config.map((f, y) => {
          /* field */
          if(y > 0) {
            // 2つ目以降のconfigのfield.valueがnullの場合
            if(f.field.value === null) {
              isCorrect = false;
              f.field.fieldError = true;
              f.field.errorText = '設定してください';
            }
          }          
          /* op */
          if(f.field.value !== null && f.op.value === null) {
            isCorrect = false;
            f.op.fieldError = true;
            f.op.errorText = '設定してください';
          }
          /* value */
          if(f.field.value !== null && f.value.value === null) {
            isCorrect = false;
            f.value.fieldError = true;
            f.value.errorText = '設定してください';
          }
          return f;
        })
      };
    });

    if(!isCorrect) {
      setList(_list);
    } else {
      // フィールドエラーを解除する
      const _list = deepcp(list).map(e => {
        e.targetField.fieldError = false;
        e.controlType.fieldError = false;
        e.config = e.config.map(f => {
          f.field.fieldError = false;
          f.op.fieldError = false;
          f.value.fieldError = false;
          return f
        });
        return e;
      });
      setList(_list);
    }
    
    return isCorrect;
  };

  const savePluginSettings = () => {
    // ValueCheck
    if(!checkSetting()) return;

    const pluginSetting: PluginSetting = {
      systemSetting: { _: {} },
      customizeSetting: {
        fieldControlList: list.map(e => ({
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
      {
        config: JSON.stringify(pluginSetting)
      },
      () => {
        console.log('設定完了');
      }
    );
  };

  return (
    <div css={[style.container, style.toggle(props.show)]}>
      <FieldControlList />
      <div css={style.buttons}>
        <button 
          className='kintoneplugin-button-normal'
          onClick={() => { history.back() }}
        >キャンセル</button>
        <button className='kintoneplugin-button-dialog-ok' onClick={savePluginSettings}>
          保存
        </button>
      </div>
    </div>
  );
};
