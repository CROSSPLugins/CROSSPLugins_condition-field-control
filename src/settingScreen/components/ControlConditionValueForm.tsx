import { useContext, useCallback } from "react";
import { useRecoilState } from "recoil";
import { fieldControlList } from "../store";
import { ControlConditionContext } from "./TD_ControlCondition";
import { deepcp } from "../utils";
import KintoneText from "./KintoneText";
import KintoneCheckBox from "./KintoneCheckBox";
import CustomDateForm from "./customForm/CustomDateForm";
import CustomTimeForm from "./customForm/CustomTimeForm";
import CustomDateTimeForm from "./customForm/CustomDateTimeForm";

const isArray = (arg: string | number | (string | number)[] | null): arg is (string | number)[] => {
  return Array.isArray(arg);
};
const isString = (arg: string | number | (string | number)[] | null): arg is string => {
  return typeof arg === 'string';
};

export default () => {
  const [list, setList] = useRecoilState(fieldControlList);
  const { 
    listIndex,
    configIndex,
    formFieldsInfo,
    fieldType
  } = useContext(ControlConditionContext);

  const render = useCallback(() => {
    const configValue = list[listIndex].config[configIndex].value;
    switch(fieldType) {
      case 'SINGLE_LINE_TEXT':
      case 'LINK':
      case 'NUMBER':
      case 'CALC':
      case 'MULTI_LINE_TEXT':
      case 'CATEGORY':
      case 'RECORD_NUMBER':
        if(!isArray(configValue)) {
          return (
            <KintoneText
              value={configValue ?? ''}
              onChange={value => {
                const _list = deepcp(list);
                _list[listIndex].config[configIndex].value = value;
                setList(_list);
              }}
            />
          );
        } else {
          throw new Error('予期せぬエラーが発生しました。');
        }
      case 'CHECK_BOX':
      case 'RADIO_BUTTON':
      case 'DROP_DOWN':
      case 'MULTI_SELECT':
        if(isArray(configValue)) {
          return (
            <KintoneCheckBox
              options={
                Object.values(
                  formFieldsInfo
                    .filter(e => e.code === list[listIndex].config[configIndex].field)[0].options)
                    .map(e => {
                      if(configValue.some(f => f === e.label)) {
                        return { value: e.label, checked: false };
                      } else {
                        return { value: e.label, checked: false };
                      }
                    })
                }
              onChange={value => {
                const _list = deepcp(list);
                _list[listIndex].config[configIndex].value = value;
                setList(_list);
              }}
            />
          );
        } else {
          throw new Error('予期せぬエラーが発生しました。');
        }
      case 'DATE':
        if(isString(configValue)) {
          return (
            <CustomDateForm 
              value={configValue}
              onChange={value => {
                const _list = deepcp(list);
                _list[listIndex].config[configIndex].value = value;
                setList(_list);
              }}
            />
          );
        } else {
          throw new Error('予期せぬエラーが発生しました。');
        }
      case 'TIME':
        if(isString(configValue)) {
          return (
            <CustomTimeForm 
              value={configValue}
              onChange={value => {
                const _list = deepcp(list);
                _list[listIndex].config[configIndex].value = value;
                setList(_list);
              }}
            />
          );
        } else {
          throw new Error('予期せぬエラーが発生しました。');
        }
      case 'DATETIME':
      case 'CREATED_TIME':
      case 'UPDATED_TIME':
        if(isString(configValue)) {
          return (
            <CustomDateTimeForm
              value={configValue}
              onChange={value => {
                const _list = deepcp(list);
                _list[listIndex].config[configIndex].value = value;
                setList(_list);
              }}
            />
          );
        } else {
          throw new Error('予期せぬエラーが発生しました。');
        }
      case null:
        return (
          <div style={{ boxSizing: 'border-box', width: '200px' }}></div>
        );
      default:
        throw new Error('予期せぬエラーが発生しました。');
    }
  }, [fieldType])

  return (
    <>
      {
        render()
      }
    </>
  )
};