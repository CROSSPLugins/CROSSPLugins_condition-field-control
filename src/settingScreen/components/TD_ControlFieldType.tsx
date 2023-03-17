import { SetterOrUpdater } from 'recoil';
import { ControlType, FieldControl } from '../type';
import { deepcp } from '../utils';

type FormFieldsInfo = { 
  type: string
  code: string
  label: string
  expression: string 
};

export default (props: {
  listIndex: number
  rowSpan: number
  formFieldsInfo: FormFieldsInfo[]
  list: FieldControl[]
  setList: SetterOrUpdater<FieldControl[]>
}) => {
  const filteringFormFields = (formFieldsInfo: FormFieldsInfo[], list: FieldControl[], listIndex: number) => {
    return formFieldsInfo.filter(e => {
      if(list[listIndex].controlType === 'required') {
        switch(e.type) {
          case 'CATEGORY':
          case 'CHECK_BOX':
          case 'DATE':
          case 'DATETIME':
          case 'DROP_DOWN':
          case 'GROUP_SELECT':
          case 'LINK':
          case 'MULTI_LINE_TEXT':
          case 'MULTI_SELECT':
          case 'NUMBER':
          case 'ORGANIZATION_SELECT':
          case 'RADIO_BUTTON':
          case 'RICH_TEXT':
          case 'SINGLE_LINE_TEXT':
          case 'TIME':
          case 'USER_SELECT':
            return true;
          default:
            return false;
        }
      }
      else if (list[listIndex].controlType === 'uneditable') {
        switch(e.type) {
          case 'CATEGORY':
          case 'CHECK_BOX':
          case 'DATE':
          case 'DATETIME':
          case 'DROP_DOWN':
          case 'FILE':
          case 'GROUP_SELECT':
          case 'LINK':
          case 'MULTI_LINE_TEXT':
          case 'MULTI_SELECT':
          case 'NUMBER':
          case 'ORGANIZATION_SELECT':
          case 'RADIO_BUTTON':
          case 'RICH_TEXT':
          case 'SINGLE_LINE_TEXT':
            // 自動計算が設定されている文字列1行は対象外
            if(e.expression) return false;
            break;
          case 'TIME':
          case 'USER_SELECT':
            return true;
          default:
            return false;
        }
      }
      else {
        throw new Error('想定外のエラーが発生しました。');
      }
    });
  };

  return (
    <>
      <td rowSpan={props.rowSpan}>
        <div className="kintoneplugin-select-outer">
          <div className="kintoneplugin-select">
            <select 
              value={props.list[props.listIndex].targetField ?? ''} 
              onChange={(event) => {
                const _list = deepcp(props.list);
                _list[props.listIndex].targetField = event.target.value;
                props.setList(_list);
              }}>
              <option value="" disabled>- - -</option>
              {
                filteringFormFields(props.formFieldsInfo, props.list, props.listIndex).map(e => (
                  <option key={e.code} value={e.code}>{e.label}</option>
                ))
              }
            </select>
          </div>
        </div>
      </td>
      <td rowSpan={props.rowSpan}>
        <div className="kintoneplugin-select-outer">
          <div className="kintoneplugin-select">
            <select 
              value={props.list[props.listIndex].controlType} 
              onChange={(event) => {
                const _list = deepcp(props.list);
                _list[props.listIndex].controlType = event.target.value as ControlType;
                props.setList(_list);
              }}>
              <option value="required">入力必須</option>
              <option value="uneditable">編集不可</option>
            </select>
          </div>
        </div>
      </td>
    </>
  );
};