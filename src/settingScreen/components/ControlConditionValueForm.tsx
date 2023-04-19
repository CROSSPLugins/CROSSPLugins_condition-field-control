import { useContext, useCallback } from "react";
import { useRecoilState } from "recoil";
import { fieldControlList } from "../store";
import { ControlConditionContext } from "./TD_ControlCondition";
import { deepcp } from "../utils";
import KintoneText from "./kintoneForm/KintoneText";
import KintoneCheckBox from "./kintoneForm/KintoneCheckBox";
import CustomDateForm from "./customForm/CustomDateForm";
import CustomTimeForm from "./customForm/CustomTimeForm";
import CustomDateTimeForm from "./customForm/CustomDateTimeForm";
import FormErrorLabel from "./FormErrorLabel";

const isArray = (arg: string | number | (string | number)[] | null): arg is (string | number)[] => {
  return Array.isArray(arg);
};
const isString = (arg: string | number | (string | number)[] | null): arg is string => {
  return typeof arg === 'string';
};
const isNumber = (arg: string | number | (string | number)[] | null): arg is number => {
  return typeof arg === 'number';
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
    const configValue = list[listIndex].config[configIndex].value.value;
    switch(fieldType) {
      case 'SINGLE_LINE_TEXT':
      case 'LINK':
      case 'NUMBER':
      case 'CALC':
      case 'MULTI_LINE_TEXT':
      case 'CATEGORY':
      case 'RECORD_NUMBER':
        if(isString(configValue) || isNumber(configValue)) {
          return (
            <KintoneText
              value={configValue}
              onChange={value => {
                setList((_old_list) => {
                  const _list = deepcp(_old_list);
                  _list[listIndex].config[configIndex].value.value = value;
                  return _list;
                });
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
                    .filter(e => e.code === list[listIndex].config[configIndex].field.value)[0].options)
                    .map(e => {
                      if(configValue.some(f => f === e.label)) {
                        return { value: e.label, checked: true };
                      } else {
                        return { value: e.label, checked: false };
                      }
                    })
                }
              onChange={value => {
                setList((_old_list) => {
                  const _list = deepcp(_old_list);
                  _list[listIndex].config[configIndex].value.value = value;
                  return _list;
                });
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
                setList((_old_list) => {
                  const _list = deepcp(_old_list);
                  _list[listIndex].config[configIndex].value.value = value;
                  return _list;
                });
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
                setList((_old_list) => {
                  const _list = deepcp(_old_list);
                  _list[listIndex].config[configIndex].value.value = value;
                  return _list;
                });
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
                setList((_old_list) => {
                  const _list = deepcp(_old_list);
                  _list[listIndex].config[configIndex].value.value = value;
                  return _list;
                });
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
      <FormErrorLabel error={list[listIndex].config[configIndex].value.fieldError}>
        {list[listIndex].config[configIndex].value.errorText}
      </FormErrorLabel>
    </>
  )
};