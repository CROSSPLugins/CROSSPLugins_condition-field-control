import { PluginSetting } from "../type";
import { executeAndCreateExpression } from "./executeAndCreateExpression";
import { isBlankKintoneField } from "./utils";

(($PLUGIN_ID) => {
  // プラグイン設定情報取得
  const charconfig = kintone.plugin.app.getConfig($PLUGIN_ID).config;

  if(!charconfig) return;

  // 設定情報パース
  const config: PluginSetting = JSON.parse(charconfig);
  
  // ライセンス判定
  // if(license === false) return;

  if(config.customizeSetting) {
    const customizeSetting = config.customizeSetting;
    // レコード一覧編集画面 編集不可
    // レコード編集画面 編集不可
    // レコード追加画面 編集不可
    kintone.events.on(
      ['app.record.index.edit.show', 'app.record.edit.show', 'app.record.create.show'], 
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
                }
              }
            }
          }
          return event;
        } catch (e) {
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
          event.error = e;
          return event;
        }
      }
    );
  }
})(kintone.$PLUGIN_ID);