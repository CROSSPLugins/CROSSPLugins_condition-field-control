import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { FormFieldsInfo, PluginConfig, PluginSetting } from '../type';
import PageRoot from './components/PageRoot';
import { fieldControlList, formFieldsInfo, Licensekey, pluginId } from './store';
import { errorPopup } from './utils';

type Props = {
  pluginId: string
};

export default (props: Props) => {
  const setFieldControlList = useSetRecoilState(fieldControlList);
  const setFormFieldsInfo = useSetRecoilState(formFieldsInfo);
  const setLicenseKey = useSetRecoilState(Licensekey);
  const setPluginId = useSetRecoilState(pluginId);

  useEffect(() => {
    (async () => {
      setPluginId(props.pluginId);

      const pluginConfig: PluginConfig = kintone.plugin.app.getConfig(props.pluginId);

      let _formFieldsInfo: FormFieldsInfo[];
      try {
        // アプリフォーム情報を取得
        const resp = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', { app: kintone.app.getId() as number });
        _formFieldsInfo = Object.values(resp.properties) as FormFieldsInfo[];
        setFormFieldsInfo(_formFieldsInfo);
      } catch (e: any) {
        console.error(e);
        if (typeof e.code !== 'undefined') {
          if(e.code === 'GAIA_AP01') {
            errorPopup('アプリを公開してから設定してください', 'エラー');
          } else {
            errorPopup(e.message, 'エラー');
          }
        } else {
          errorPopup(e as string, 'エラー');
        }
        return;
      }

      // ライセンスキーが保存されている時の処理
      if (pluginConfig.licenseKey) {
        setLicenseKey(pluginConfig.licenseKey ?? '');
      }
      // プラグイン設定が保存されていなかったら終了
      if (!pluginConfig.config) return;
      
      const config: PluginSetting = JSON.parse(pluginConfig.config);
      // カスタマイズ設定がある時の処理
      if (config.customizeSetting) {
        // 保存済みの設定を反映[フィールド制御対象一覧]
        setFieldControlList(
          config.customizeSetting.fieldControlList.map(e => {
            const _targetField = { value: e.targetField, fieldError: false, errorText: '' };
            if(e.targetField) {
              const result = _formFieldsInfo.filter(g => g.code === e.targetField);
              if(!result.length) {
                _targetField.fieldError = true;
                _targetField.errorText = '再設定してください';
              }
            }
            return {
              id: uuidv4(),
              targetField: _targetField,
              controlType: { value: e.controlType, fieldError: false, errorText: '' },
              config: e.config.map(f => {
                const _field = { value: f.field, fieldError: false, errorText: '' };
                // field に設定しているフィールドコードがアプリフォームに存在するか
                if(f.field) {
                  const result = _formFieldsInfo.filter(g => g.code === f.field);
                  if(!result.length) {
                    _field.fieldError = true;
                    _field.errorText = '再設定してください';
                  }
                }
                return {
                  id: uuidv4(),
                  field: _field,
                  op: { value: f.op, fieldError: false, errorText: '' },
                  value: { value: f.value, fieldError: false, errorText: '' }
                }
              })
            }
          })
        );
      }
    })();
  },[]);

  return <PageRoot />;
};
