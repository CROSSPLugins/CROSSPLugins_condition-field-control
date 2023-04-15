import { css } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import FieldControlList from './FieldControlList';
import { fieldControlList, formFieldsInfo as _formFieldsInfo } from '../store';
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
  const formFieldsInfo = useRecoilValue(_formFieldsInfo);

  const checkSetting = (): boolean => {
    let isCorrect = true;

    // fieldControlList check
    const _list = deepcp(list).map(e => {
      // targetField
      if(e.targetField.value === null) {
        isCorrect = false;
        e.targetField.fieldError = true;
        e.targetField.errorText = '設定してください';
      } else {
        e.targetField.fieldError = false;
      }
      // controlType 特になし
      // config
      return {
        ...e,
        config: e.config.map((f, y) => {
          /* field */
          if(f.field.value === null) {
            // 2つ目以降のconfigのfield.valueがnullの場合
            if(y > 0) {
              isCorrect = false;
              f.field.fieldError = true;
              f.field.errorText = '設定してください';
            }
          } else {
            if(y > 0) {
              f.field.fieldError = false;
            }
            /* op */
            if(f.op.value === null) {
              isCorrect = false;
              f.op.fieldError = true;
              f.op.errorText = '設定してください';
            } else { f.op.fieldError = false; }
            /* value */
            if(f.value.value === null) {
              isCorrect = false;
              f.value.fieldError = true;
              f.value.errorText = '設定してください';
            } else {
              const tField = formFieldsInfo.filter(g => g.code === f.field.value);
              if (
                tField[0].type === 'DATETIME' || 
                tField[0].type === 'CREATED_TIME' || 
                tField[0].type === 'UPDATED_TIME'
              ) {
                // YYYY-MM-DDTHH:mm:ss の形式 または today yesterday tomorrow now であるかチェック
                if (
                  !/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d/.test(f.value.value as string) &&
                  !/(today)|(yesterday)|(tomorrow)|(now)/.test(f.value.value as string)
                ) {
                  isCorrect = false;
                  f.value.fieldError = true;
                  f.value.errorText = '値が不正です';
                } else { f.value.fieldError = false; }
              }
              else if (tField[0].type === 'DATE') {
                // YYYY-MM-DD の形式 または today yesterday tomorrow であるかチェック
                if(
                  !/\d\d\d\d-\d\d-\d\d/.test(f.value.value as string) &&
                  !/(today)|(yesterday)|(tomorrow)/.test(f.value.value as string)
                ) {
                  isCorrect = false;
                  f.value.fieldError = true;
                  f.value.errorText = '値が不正です';
                } else { f.value.fieldError = false; }
              }
              else if (tField[0].type === 'TIME') {
                // HH:mm の形式 または now であるかチェック
                if(
                  !/\d\d:\d\d/.test(f.value.value as string) &&
                  !/(now)/.test(f.value.value as string)
                ) {
                  isCorrect = false;
                  f.value.fieldError = true;
                  f.value.errorText = '値が不正です';
                } else { f.value.fieldError = false; }
              }
              else if (tField[0].type === 'RECORD_NUMBER') {
                if(!(f.value.value as string)) {
                  isCorrect = false;
                  f.value.fieldError = true;
                  f.value.errorText = '値を入力してください';
                } else { f.value.fieldError = false; }
              }
              else {
                f.value.fieldError = false;
              }
            }
          }
          return f;
        })
      };
    });

    setList(_list);
    
    return isCorrect;
  };

  const savePluginSettings = () => {
    // ValueCheck
    if(!checkSetting()) return;

    const pluginSetting: PluginSetting = {
      systemSetting: { _: {} },
      customizeSetting: {
        fieldControlList: list.map(e => ({
          targetField: e.targetField.value as string,
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
