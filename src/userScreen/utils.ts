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

export {
  isBlankKintoneField
};