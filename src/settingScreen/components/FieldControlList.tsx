import { css } from "@emotion/react";
import { globalStyle } from "../style";
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import TD_ControlFieldType from './TD_ControlFieldType';
import TD_ControlCondition from "./TD_ControlCondition";
import {
  fieldControlList,
  formFieldsInfo as _formFieldsInfo
} from '../store';
import { deepcp } from "../utils";

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
    'td:not(.kintoneplugin-table-td-operation)': {
      verticalAlign: 'top'
    },
    'thead tr:first-of-type th:first-of-type, thead tr:first-of-type th:last-of-type': {
      borderTop: 'none',
      backgroundColor: 'transparent'
    },
    'tbody tr:last-of-type td:first-of-type': {
      borderLeft: 'none',
      borderBottom: 'none'
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
    },
    '.add-control-target': {
      display: 'inline-block',
      '&:hover': {
        cursor: 'pointer'
      }
    }
  })
};

export default () => {
  // フィールド制御一覧
  const [list, setList] = useRecoilState(fieldControlList);
  // アプリフォーム情報
  const formFieldsInfo = useRecoilValue(_formFieldsInfo);

  const addConfig = (listIndex: number, configIndex: number) => {
    const _list = deepcp(list);
    _list[listIndex].config.splice(configIndex + 1, 0, 
      {
        id: uuidv4(),
        field: { value: null, fieldError: false, errorText: '' }, 
        op: { value: null, fieldError: false, errorText: '' },
        value: { value: null, fieldError: false, errorText: '' }  
      }
    );
    setList(_list);
  };

  const removeConfig = (listIndex: number, configIndex: number) => {
    const _list = deepcp(list);
    _list[listIndex].config.splice(configIndex, 1);
    setList(_list);
  };

  const addFieldControl = () => {
    setList([
      ...deepcp(list),
      {
        id: uuidv4(),
        targetField: { value: null, fieldError: false, errorText: '' },
        controlType: { value: 'required', fieldError: false, errorText: '' },
        config: [
          {
            id: uuidv4(),
            field: { value: null, fieldError: false, errorText: '' },
            op: { value: null, fieldError: false, errorText: '' },
            value: { value: null, fieldError: false, errorText: '' }
          }
        ]
      }
    ]);
  };

  const removeFieldControl = (listIndex: number) => {
    const _list = deepcp(list);
    if(_list.length === 1) {
      // 初期値に設定する
      _list[0].targetField = { value: null, fieldError: false, errorText: '' };
      _list[0].controlType = { value: 'required', fieldError: false, errorText: '' };
      _list[0].config = [
        {
          id: _list[0].id,
          field: { value: null, fieldError: false, errorText: '' },
          op: { value: null, fieldError: false, errorText: '' },
          value: { value: null, fieldError: false, errorText: '' }
        }
      ]
      setList(_list);
      return;
    }
    _list.splice(listIndex, 1);
    setList(_list);
  };

  return (
    <div id='crossplugins-cfc_field-control-list'>
      <h1 css={globalStyle.h1}>フィールド制御一覧</h1>
      <table border={1} css={style.table}>
        <thead>
          <tr>
            <th rowSpan={2}></th>
            <th rowSpan={2}>制御対象フィールド</th>
            <th rowSpan={2}>制御の種類</th>
            <th colSpan={3}>制御の条件設定</th>
            <th rowSpan={2}></th>
          </tr>
          <tr>
            <th>フィールド</th>
            <th>条件指定</th>
            <th>値</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((e, listIndex) => e.config.map((f, configIndex)=>{
              if(configIndex === 0) {
                return (
                  <tr key={`${e.id}_${f.id}`}>
                    <td rowSpan={e.config.length} className="kintoneplugin-table-td-operation">
                      <button
                        type="button"
                        onClick={() => { removeFieldControl(listIndex) }} 
                        className="kintoneplugin-button-remove-row-image" 
                        title="制御対象フィールドを削除する"
                      />
                    </td>
                    <TD_ControlFieldType
                      listIndex={listIndex}
                      rowSpan={e.config.length}
                      formFieldsInfo={formFieldsInfo}
                    />
                    <TD_ControlCondition
                      listIndex={listIndex}
                      configIndex={configIndex}
                      formFieldsInfo={formFieldsInfo}
                      isFirst={true}
                    />
                    <td className="kintoneplugin-table-td-operation">
                      <button
                        type="button"
                        onClick={() => { list[listIndex].config[configIndex].field.value !== null && addConfig(listIndex, configIndex) }}
                        className="kintoneplugin-button-add-row-image"
                        title="条件を追加する"
                      />
                      <button
                        type="button"
                        onClick={() => { e.config.length !== 1 && removeConfig(listIndex, configIndex)}} 
                        className="kintoneplugin-button-remove-row-image" 
                        title="条件を削除する"
                      />
                    </td>
                  </tr>
                )
              } else {
                return (
                  <tr key={`${e.id}_${f.id}`}>
                    <TD_ControlCondition 
                      listIndex={listIndex}
                      configIndex={configIndex}
                      formFieldsInfo={formFieldsInfo}
                      isFirst={false}
                    />
                    <td className="kintoneplugin-table-td-operation">
                      <button
                        type="button" 
                        onClick={() => { addConfig(listIndex, configIndex) }}
                        className="kintoneplugin-button-add-row-image"
                        title="条件を追加する"
                      />
                      <button
                        type="button"
                        onClick={() => { e.config.length !== 1 && removeConfig(listIndex, configIndex)}}
                        className="kintoneplugin-button-remove-row-image"
                        title="条件を削除する"
                      />
                    </td>
                  </tr>
                )
              }
            }))
          }
          <tr>
            <td></td>
            <td colSpan={5} className="kintoneplugin-table-td-operation">
              <div className="add-control-target" onClick={() => { addFieldControl() }}>
                <button 
                  type="button"
                  className="kintoneplugin-button-add-row-image"
                  title="制御対象フィールドを追加する" 
                />
                <span>制限対象フィールドを追加する</span>
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};