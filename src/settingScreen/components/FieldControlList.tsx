import { css } from "@emotion/react";
import { globalStyle } from "../style";

const tableBorderColor = '#d8d8d8';

const style = {
  table: css({
    borderSpacing: 0,
    border: 'none',
    fontSize: '1rem',
    marginLeft: '20px',
    'td': {
      border: 'none',
      borderTop: `1px solid ${tableBorderColor}`,
      borderLeft: `1px solid ${tableBorderColor}`,
      padding: '0.5rem 1rem'
    },
    'tr:last-of-type td': {
      borderBottom: `1px solid ${tableBorderColor}`
    },
    'td:last-of-type': {
      borderRight: `1px solid ${tableBorderColor}`
    },
    'thead tr:first-of-type th:last-of-type': {
      borderTop: 'none',
      backgroundColor: 'transparent'
    },
    'tbody tr:last-of-type td:last-of-type': {
      borderRight: 'none',
      borderBottom: 'none'
    },
    'th': {
      border: 'none',
      fontWeight: 'normal',
      backgroundColor: '#3498DB',
      color: '#FFF',
      padding: '0.3rem 1rem'
    },
    '.kintoneplugin-button-add-row-image': {
      marginLeft: 0
    },
    '.kintoneplugin-table-td-operation': {
      fontSize: '0.8rem',
      textAlign: 'center',
      button: {
        verticalAlign: 'middle'
      }
    },
    '.kintoneplugin-select': {
      verticalAlign: 'top'
    }
  })
};

export default () => {
  return (
    <div id='crossplugins-cfc_field-control-list'>
        <h1 css={globalStyle.h1}>フィールド制御一覧</h1>
        <table border={1} css={style.table}>
          <thead>
            <tr>
              <th rowSpan={2}>制御対象フィールド</th>
              <th rowSpan={2}>制御の種類</th>
              <th colSpan={3}>制御の条件設定</th>
              <th rowSpan={2}></th>
            </tr>
            <tr>
              <th>フィールド</th>
              <th>オペレーター</th>
              <th>値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="kintoneplugin-select-outer">
                  <div className="kintoneplugin-select">
                    <select>
                      <option>セレクトA</option>
                      <option>セレクトB</option>
                      <option>セレクトC</option>
                    </select>
                  </div>
                </div>
              </td>
              <td>入力必須</td>
              <td>日付</td>
              <td>＝（等しい）</td>
              <td>2023/10/01</td>
              <td className="kintoneplugin-table-td-operation">
                <button type="button" className="kintoneplugin-button-add-row-image" title="条件を追加する"></button>
                <button type="button" className="kintoneplugin-button-remove-row-image" title="条件を削除する"></button>
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="kintoneplugin-table-td-operation">
                <button type="button" className="kintoneplugin-button-add-row-image" title="制御対象フィールドを追加する" />
                制限対象フィールドを追加する
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
  );
};