import { useState } from 'react';
import { ControlType } from '../type';

export default (props: { 
  index: number
  rowSpan: number
  formFieldsInfo: { type: string, code: string, label: string, expression: string }[]
}) => {
  const [controlType, setControlType] = useState<ControlType>('required');

  return (
    <>
      <td rowSpan={props.rowSpan}>
        <div className="kintoneplugin-select-outer">
          <div className="kintoneplugin-select">
            <select defaultValue="- - -">
              <option disabled>- - -</option>
              {
                props.formFieldsInfo.filter(e => {
                  if(controlType === 'required') { // 必須項目
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
                  else if(controlType === 'uneditable') { // 編集不可
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
            <select onChange={(event) => { setControlType(event.target.value as ControlType)}}>
              <option value="required">入力必須</option>
              <option value="uneditable">編集不可</option>
            </select>
          </div>
        </div>
      </td>
    </>
  );
};