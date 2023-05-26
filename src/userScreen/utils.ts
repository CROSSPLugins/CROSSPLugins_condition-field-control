import { Properties } from "@kintone/rest-api-client/lib/client/types";

/**
 * kintoneフィールド値がブランクであるか判定する
 */
const isBlankKintoneField = (value: string | string[], fieldType: string): boolean => {
  // フィールドタイプ が リッチエディター の場合
  if (fieldType === 'RICH_TEXT') {
    return value === '<div><br /></div>';
  } 
  else {
    // 配列
    if (Array.isArray(value)) {
      return !value.length;
    }
    // 文字列 | 数値
    return !value;
  }
};

const getFormFields = async (): Promise<{ properties: Properties }> => {
  return await kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', { app: kintone.app.getId() as number });
};

export {
  isBlankKintoneField,
  getFormFields
};