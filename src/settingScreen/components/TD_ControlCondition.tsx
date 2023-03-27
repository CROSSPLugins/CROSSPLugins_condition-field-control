import { useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import { FieldControl, FormFieldsInfo } from '../../type';
import { deepcp } from '../utils';

export default (props: {
  listIndex: number
  configIndex: number
  formFieldsInfo: FormFieldsInfo[]
  list: FieldControl[]
  setList: SetterOrUpdater<FieldControl[]>
}) => {
  const [fieldType, setFieldType] = useState('');

  const filteringFormFields = (formFieldsInfo: FormFieldsInfo[]) => {
    return formFieldsInfo.filter(e => {
      switch(e.type) {
        case 'CALC':
        case 'CATEGORY':
        case 'CHECK_BOX':
        case 'CREATED_TIME':
        case 'DATE':
        case 'DATETIME':
        case 'DROP_DOWN':
        case 'LINK':
        case 'MULTI_LINE_TEXT':
        case 'MULTI_SELECT':
        case 'NUMBER':
        case 'RADIO_BUTTON':
        case 'RECORD_NUMBER':
        case 'SINGLE_LINE_TEXT':
        case 'TIME':
        case 'UPDATED_TIME':
          return true;
        default:
          return false;
      }
    });
  };

  const switchingOperator = (fieldType: string) => {
    switch(fieldType) {
      case 'SINGLE_LINE_TEXT':
      case 'LINK':
      case 'CATEGORY':
        return ['＝（等しい）', '≠（等しくない）', '次のキーワードを含む', '次のキーワードを含まない'].map(e => (
          <option key={e} value={e}>{e}</option>
        ));
      case 'NUMBER':
      case 'CALC':
      case 'RECORD_NUMBER':
        return ['＝（等しい）', '≠（等しくない）', '＞（以上）', '＜（以下）'].map(e => (
          <option key={e} value={e}>{e}</option>
        ));
      case 'MULTI_LINE_TEXT':
        return ['次のキーワードを含む', '次のキーワードを含まない'].map(e => (
          <option key={e} value={e}>{e}</option>
        ));
      case 'CHECK_BOX':
      case 'RADIO_BUTTON':
      case 'DROP_DOWN':
      case 'MULTI_SELECT':
        return ['次のいずれかを含む', '次のいずれかを含まない'].map(e => (
          <option key={e} value={e}>{e}</option>
        ));
      case 'DATE':
      case 'TIME':
      case 'DATETIME':
      case 'CREATED_TIME':
      case 'UPDATED_TIME':
        return ['＝（等しい）', '≠（等しくない）', '≧（以降）', '≦（以前）'].map(e => (
          <option key={e} value={e}>{e}</option>
        ));
      default:
        if(fieldType !== '') throw new Error('想定外のエラーが発生しました。');
    }
  };

  return (
    <>
      <td>
        <div className="kintoneplugin-select-outer">
          <div className="kintoneplugin-select">
            <select
              value={props.list[props.listIndex].config[props.configIndex].field ?? ''}
              onChange={(event) => {
                setFieldType(event.target[event.target.selectedIndex].getAttribute('data-fieldtype') as string);
                const _list = deepcp(props.list);
                _list[props.listIndex].config[props.configIndex].field = event.target.value;
                props.setList(_list);
              }}
            >
              <option value="" disabled>- - -</option>
              {
                filteringFormFields(props.formFieldsInfo).map(e => (
                  <option key={e.code} value={e.code} data-fieldtype={e.type}>{e.label}</option>
                ))
              }
            </select>
          </div>
        </div>
      </td>
      <td>
        <div className="kintoneplugin-select-outer">
          <div className="kintoneplugin-select">
              <select
                value={props.list[props.listIndex].config[props.configIndex].op ?? ''}
                onChange={(event) => {
                  const _list = deepcp(props.list);
                  _list[props.listIndex].config[props.configIndex].op = event.target.value;
                  props.setList(_list);
                }}
              >
                <option value="" disabled>- - -</option>
                {
                  switchingOperator(fieldType)
                }
              </select>
          </div>
        </div>
      </td>
      <td>2023/10/01</td>
    </>
  );
};