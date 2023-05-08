/**
 * kintoneフィールド値がブランクであるか判定する
 */
const isBlankKintoneField = (value: string | string[]): boolean => {
  // 配列
  if (Array.isArray(value)) {
    return !value.length;
  }
  // 文字列 | 数値
  return !value;
};

export {
  isBlankKintoneField
};