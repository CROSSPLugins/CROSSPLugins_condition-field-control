import { useRecoilState } from 'recoil';
import { ControlType, FieldControl, FormFieldsInfo } from '../../type';
import { deepcp } from '../utils';
import { fieldControlList } from '../store';
import KintoneDropDown from './kintoneForm/KintoneDropDown';

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
          return true;
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

export default (props: {
  listIndex: number
  rowSpan: number
  formFieldsInfo: FormFieldsInfo[]
}) => {
  const [list, setList] = useRecoilState(fieldControlList);

  return (
    <>
      <td rowSpan={props.rowSpan}>
        <KintoneDropDown 
          value={list[props.listIndex].targetField ?? ''}
          options={
            filteringFormFields(props.formFieldsInfo, list, props.listIndex).map(e => ({ value: e.code, text: e.label }))
          }
          onChange={value => {
            const _list = deepcp(list);
            // value === '' の場合は、nullを挿入する
            _list[props.listIndex].targetField = value === '' ? null : value as string;
            setList(_list);
          }}
          unselectValue
        />
      </td>
      <td rowSpan={props.rowSpan}>
        <KintoneDropDown 
          value={list[props.listIndex].controlType}
          options={[{ value: 'required', text: '入力必須' }, { value: 'uneditable', text: '編集不可' }]}
          onChange={value => {
            const _list = deepcp(list);
            _list[props.listIndex].controlType = value as ControlType;
            setList(_list);
          }}
        />
      </td>
    </>
  );
};