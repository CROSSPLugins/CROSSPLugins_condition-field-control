export type ControlType = 
  'uneditable' | // 編集不可 
  'required' // 必須項目
;

export type FieldControl = {
  // 制御対象フィールドコード
  targetField: string | null
  // 制御の種類
  controlType: ControlType
  // 制御の条件設定一覧
  config: {
    // 制御条件対象フィールドコード
    field: string | null
    // オペレーター
    op: string | null
    // 値
    value: string | null
  }[]
};

/**
 * アプリのフォームに設定されているフィールドの取得APIのproperties型
 * 使用するプロパティのみ記載
 */
export type FormFieldsInfo = { 
  type: string
  code: string
  label: string
  expression: string 
};