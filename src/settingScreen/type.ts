export type ControlType = 
  'uneditable' | // 編集不可 
  'required' // 必須項目
;

export type FieldControl = {
  // 制御対象フィールドコード
  targetField: string
  // 制御の種類
  controlType: ControlType
  // 制御の条件設定一覧
  config: {
    // 制御条件対象フィールドコード
    field: string
    // オペレーター
    op: string
    // 値
    value: string
  }[]
};