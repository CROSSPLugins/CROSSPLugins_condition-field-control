export type ControlType = 
  'uneditable' | // 編集不可 
  'required' // 必須項目
;

export type FieldControlConfig = {
  // 制御条件対象フィールドコード
  field: string | null
  // オペレーター
  op: string | null
  // 値
  value: string | number | (string | number)[] | null
};

export type FieldControl = {
  // 制御対象フィールドコード
  targetField: string
  // 制御の種類
  controlType: ControlType
  // 制御の条件設定一覧
  config: FieldControlConfig[]
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
  options: {
    [optionname: string]: {
      label: string
    }
  }
  enabled: boolean
};

// システム設定
export type SystemSetting = {
  _: any
};

// カスタマイズ設定
export type CustomizeSetting = {
  fieldControlList: FieldControl[]
};

// プラグイン設定
export type PluginSetting = {
  systemSetting?: SystemSetting
  customizeSetting?: CustomizeSetting
};

// プラグイン格納情報
export type PluginConfig = {
  licenseKey?: string // ライセンスキー
  config?: string
};