import { useContext } from "react";
import { useRecoilState } from "recoil";
import { fieldControlList } from "../store";
import { ControlConditionContext } from "./TD_ControlCondition";
import KintoneDropDown from "./kintoneForm/KintoneDropDown";
import { deepcp } from "../utils";

/**
 * 「制御の条件設定」のフィールドタイプに応じて選択肢を切り替える
 */
const switchingOperator = (_fieldType: string | null) => {
  switch(_fieldType) {
    case 'SINGLE_LINE_TEXT':
    case 'LINK':
    case 'CATEGORY':
      return ['＝（等しい）', '≠（等しくない）', '次のキーワードを含む', '次のキーワードを含まない'].map(e => ({ value: e, text: e }));
    case 'NUMBER':
    case 'CALC':
    case 'RECORD_NUMBER':
      return ['＝（等しい）', '≠（等しくない）', '＞（以上）', '＜（以下）'].map(e => ({ value: e, text: e }));
    case 'MULTI_LINE_TEXT':
      return ['次のキーワードを含む', '次のキーワードを含まない'].map(e => ({ value: e, text: e }));
    case 'CHECK_BOX':
    case 'RADIO_BUTTON':
    case 'DROP_DOWN':
    case 'MULTI_SELECT':
      return ['次のいずれかを含む', '次のいずれかを含まない'].map(e => ({ value: e, text: e }));
    case 'DATE':
    case 'TIME':
    case 'DATETIME':
    case 'CREATED_TIME':
    case 'UPDATED_TIME':
      return ['＝（等しい）', '≠（等しくない）', '≧（以降）', '≦（以前）'].map(e => ({ value: e, text: e }));
    case null:
      return [];
    default:
      throw new Error('想定外のエラーが発生しました。');
  }
};

export default () => {
  const [list, setList] = useRecoilState(fieldControlList);
  const { 
    listIndex,
    configIndex,
    fieldType
  } = useContext(ControlConditionContext);

  return (
    <>
      <KintoneDropDown 
        value={list[listIndex].config[configIndex].op ?? ''}
        options={switchingOperator(fieldType)}
        onChange={(value) => {
          const _list = deepcp(list);
          _list[listIndex].config[configIndex].op = value === '' ? null : value as string;
          setList(_list);
        }}
        disabled={fieldType === null}
      />
    </>
  );
};