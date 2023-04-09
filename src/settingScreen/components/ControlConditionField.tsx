import { useRecoilState } from "recoil";
import { fieldControlList } from "../store";
import { ControlConditionContext } from "./TD_ControlCondition";
import KintoneDropDown from "./kintoneForm/KintoneDropDown";
import { useContext } from "react";
import { FormFieldsInfo } from "../../type";
import { deepcp } from "../utils";
import FormErrorLabel from "./FormErrorLabel";

/**
 * 「制御の条件設定」のフィールドに選択できるフィールド情報を絞り込む
 */
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

const setNoConditionOption = (_: boolean) => _ ? [{ value: '', text: '条件なし' }] : [];

type Props = {
  error: boolean
};

export default (props: Props) => {
  const [list, setList] = useRecoilState(fieldControlList);
  const { 
    listIndex,
    configIndex,
    formFieldsInfo,
    setFieldType,
    isFirst
  } = useContext(ControlConditionContext);

  return (
    <>
      <KintoneDropDown 
        value={list[listIndex].config[configIndex].field.value ?? ''}
        options={[
          ...setNoConditionOption(isFirst),
          ...filteringFormFields(formFieldsInfo).map(e => ({ value: e.code, text: e.label }))
        ]}
        onChange={value => {
          const fieldType = formFieldsInfo.find(e => e.code === value)?.type ?? null;
          setFieldType(fieldType);
          const _list = deepcp(list);
          switch(fieldType) {
            case 'SINGLE_LINE_TEXT':
            case 'LINK':
            case 'NUMBER':
            case 'CALC':
            case 'MULTI_LINE_TEXT':
            case 'CATEGORY':
            case 'RECORD_NUMBER':
            case 'DATE':
            case 'TIME':
            case 'DATETIME':
            case 'CREATED_TIME':
            case 'UPDATED_TIME':
              _list[listIndex].config[configIndex].value.value = '';
              break;
            case 'CHECK_BOX':
            case 'RADIO_BUTTON':
            case 'DROP_DOWN':
            case 'MULTI_SELECT':
              _list[listIndex].config[configIndex].value.value = [];
              break;
            case null:
              _list[listIndex].config[configIndex].value.value = null;
              break;
            default:
              throw new Error('予期せぬエラーが発生しました。');
          }
          // value === '' の場合は、nullを挿入する
          _list[listIndex].config[configIndex].field.value = value === '' ? null : value as string;
          setList(_list);
        }}
      />
      <FormErrorLabel error={props.error}>
        再設定してください
      </FormErrorLabel>
    </>
  );
};