import { Properties } from "@kintone/rest-api-client/lib/client/types";
import { RadioButton } from "@kintone/rest-api-client/lib/KintoneFields/types/property";
import { PluginSetting } from "../type";
import { executeAndCreateExpression } from "./executeAndCreateExpression";
import { isBlankKintoneField, getFormFields } from "./utils";
import decryptLicenseInfo from "../common/modules/decryptLicensekey";
import isWithinExpirationDate from "../common/modules/isWithinExpirationDate";

(($PLUGIN_ID) => {
  // プラグイン設定情報取得
  const charconfig = kintone.plugin.app.getConfig($PLUGIN_ID).config;

  if(!charconfig) return;

  // 設定情報パース
  const config: PluginSetting = JSON.parse(charconfig);
  
  // ライセンス判定
  if (config.systemSetting) {
    // falsyな値の場合は処理しない
    if (!config.systemSetting.licenseKey) return;
    const licenseInfo = decryptLicenseInfo(config.systemSetting.licenseKey);
    // 有効期限判定
    if (!isWithinExpirationDate(licenseInfo.expirationDateUnixTime)) return;
  } else {
    return;
  }
  console.log('[DEBUG] ライセンス有効');

  if(config.customizeSetting) {
    const customizeSetting = config.customizeSetting;
    // アプリフォーム情報
    let formFields: { properties: Properties };
    // レコード一覧編集画面 編集不可
    // レコード編集画面 編集不可
    // レコード追加画面 編集不可
    kintone.events.on(
      ['app.record.index.edit.show', 'app.record.edit.show', 'app.record.create.show'], 
      async (event) => {
        try {
          for (const fieldCtrl of customizeSetting.fieldControlList) {
            if (fieldCtrl.controlType === 'uneditable') {
              // 条件なし
              if (fieldCtrl.config[0].field === null) {
                event.record[fieldCtrl.targetField].disabled = true;
              }
              // 複数の条件に合致するか
              else {
                let numMatch = 0;
                for (const ctrlConfig of fieldCtrl.config) {
                  // フィールド情報にアクセス出来ないときはスキップ
                  if (!event.record[ctrlConfig.field as string]) continue;
                  // ラジオボタン の値が 空文字の場合
                  if (
                    event.record[ctrlConfig.field as string].type === 'RADIO_BUTTON' &&
                    event.record[ctrlConfig.field as string].value === ''
                  ) {
                    // フォーム情報が未取得の場合は取得する
                    if (!formFields) formFields = await getFormFields();
                    if (
                      executeAndCreateExpression(
                        event.record[ctrlConfig.field as string].value,
                        ctrlConfig.op as string,
                        ctrlConfig.value,
                        event.record[ctrlConfig.field as string].type,
                        (formFields.properties[ctrlConfig.field as string] as RadioButton).defaultValue
                      )
                    ) {
                      numMatch++;
                    }
                  }
                  else {
                    if (
                      executeAndCreateExpression(
                        event.record[ctrlConfig.field as string].value,
                        ctrlConfig.op as string,
                        ctrlConfig.value,
                        event.record[ctrlConfig.field as string].type
                      )
                    ) {
                      numMatch++;
                    }
                  }
                }
                if (fieldCtrl.config.length === numMatch) {
                  event.record[fieldCtrl.targetField].disabled = true;
                }
              }
            }
          }
          return event;
        } catch (e) {
          console.error(e);
          event.error = e;
          return event;
        }
    });
    // レコード一覧編集保存実行時 入力必須
    // レコード編集保存実行時 入力必須
    // レコード追加保存実行時 入力必須
    kintone.events.on(
      ['app.record.index.edit.submit', 'app.record.edit.submit', 'app.record.create.submit'],
      (event) => {
        try {
          let isDisplayError = false;
          for (const fieldCtrl of customizeSetting.fieldControlList) {
            if (fieldCtrl.controlType === 'required') {
              // 条件なし
              if (fieldCtrl.config[0].field === null) {
                if (isBlankKintoneField(event.record[fieldCtrl.targetField].value, event.record[fieldCtrl.targetField].type)) {
                  isDisplayError = true;
                  event.record[fieldCtrl.targetField].error = '入力必須です';
                }
              }
              // 複数の条件に合致するか
              else {
                let numMatch = 0;
                for (const ctrlConfig of fieldCtrl.config) {
                  // フィールド情報にアクセス出来ないときはスキップ
                  if (!event.record[ctrlConfig.field as string]) continue;
                  if (
                    executeAndCreateExpression(
                      event.record[ctrlConfig.field as string].value,
                      ctrlConfig.op as string,
                      ctrlConfig.value,
                      event.record[ctrlConfig.field as string].type
                    )
                  ) {
                    numMatch++;
                  }
                }
                if (fieldCtrl.config.length === numMatch) {
                  if (isBlankKintoneField(event.record[fieldCtrl.targetField].value, event.record[fieldCtrl.targetField].type)) {
                    isDisplayError = true;
                    event.record[fieldCtrl.targetField].error = '入力必須です';
                  }
                }
              }
            }
          }

          if (isDisplayError) {
            event.error = 'エラーです';
          }
          return event;
        } catch (e) {
          console.error(e);
          event.error = e;
          return event;
        }
    });
    // レコード一覧編集画面 フィールド値変更時 編集不可
    // レコード編集画面 フィールド値変更時 編集不可
    // レコード追加画面 フィールド値変更時 編集不可
    kintone.events.on(
      customizeSetting.fieldControlList
          .filter(e => e.controlType === 'uneditable')
          .map(e => e.config.map(f => {
            return [`app.record.index.edit.change.${f.field}`, `app.record.edit.change.${f.field}`, `app.record.create.change.${f.field}`]
          }))
          .flat(2),
      (event) => {
        try {
          for (const fieldCtrl of customizeSetting.fieldControlList) {
            if (fieldCtrl.controlType === 'uneditable') {
              // 条件なし
              if (fieldCtrl.config[0].field === null) {
                event.record[fieldCtrl.targetField].disabled = true;
              }
              // 複数の条件に合致するか
              else {
                let numMatch = 0;
                for (const ctrlConfig of fieldCtrl.config) {
                  // フィールド情報にアクセス出来ないときはスキップ
                  if (!event.record[ctrlConfig.field as string]) continue;
                  if (
                    executeAndCreateExpression(
                      event.record[ctrlConfig.field as string].value,
                      ctrlConfig.op as string,
                      ctrlConfig.value,
                      event.record[ctrlConfig.field as string].type
                    )
                  ) {
                    numMatch++;
                  }
                }
                if (fieldCtrl.config.length === numMatch) {
                  event.record[fieldCtrl.targetField].disabled = true;
                } else {
                  event.record[fieldCtrl.targetField].disabled = false;
                }
              }
            }
          }
          return event;
        } catch (e) {
          console.error(e);
          event.error = e;
          return event;
        }
      }
    );
  }
})(kintone.$PLUGIN_ID);