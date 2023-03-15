import { SetterOrUpdater } from 'recoil';
import { ControlType, FieldControl } from '../type';
import { deepcp } from '../utils';

export default (props: {
  listIndex: number
  rowSpan: number
  formFieldsInfo: { type: string, code: string, label: string, expression: string }[]
  list: FieldControl[]
  setList: SetterOrUpdater<FieldControl[]>
}) => {
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
                props.formFieldsInfo.filter(e => {
                  if(props.list[props.listIndex].controlType === 'required') { // 必須項目
                    switch(e.type) {
                      case 'RECORD_NUMBER': // レコード番号
                      case 'CREATOR': // 作成者
                      case 'CREATED_TIME': // 作成日時
                      case 'MODIFIER': // 更新者
                      case 'UPDATED_TIME': // 更新日時
                      case 'STATUS': // ステータス
                      case 'STATUS_ASSIGNEE': // 作業者
                      case 'CALC': // 計算
                        return false;
                      default:
                        return true;
                    }
                  }
                  else if(props.list[props.listIndex].controlType === 'uneditable') { // 編集不可
                    switch(e.type) {
                      case 'RECORD_NUMBER': // レコード番号
                      case 'CREATOR': // 作成者
                      case 'CREATED_TIME': // 作成日時
                      case 'MODIFIER': // 更新者
                      case 'UPDATED_TIME': // 更新日時
                      case 'STATUS': // ステータス
                      case 'STATUS_ASSIGNEE': // 作業者
                      case 'CALC': // 計算
                        return false;
                      case 'SINGLE_LINE_TEXT':
                        // 自動計算が設定されている文字列1行は対象外
                        if(e.expression) return false;
                        return true;
                      default:
                        return true;
                    }
                  } 
                  else {
                    throw new Error('想定外のエラーが発生しました。');
                  }
                }).map(e => (
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