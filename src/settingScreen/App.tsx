import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { KintoneRestAPIClient, KintoneRestAPIError } from '@kintone/rest-api-client';
import { FormFieldsInfo, PluginSetting } from '../type';
import PageRoot from './components/PageRoot';
import { fieldControlList, formFieldsInfo } from './store';
import toastr from 'toastr';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-center',
  preventDuplicates: false,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
};

type Props = {
  pluginId: string
};

export default (props: Props) => {
  const setFieldControlList = useSetRecoilState(fieldControlList);
  const setFormFieldsInfo = useSetRecoilState(formFieldsInfo);

  useEffect(() => {
    (async () => {
      const charconfig = kintone.plugin.app.getConfig(props.pluginId).config;

      let _formFieldsInfo: FormFieldsInfo[];
      try {
        const client = new KintoneRestAPIClient();
        // アプリフォーム情報を取得
        const resp: any = await client.app.getFormFields({ app: kintone.app.getId() as number });
        _formFieldsInfo = Object.values(resp.properties) as FormFieldsInfo[];
        setFormFieldsInfo(_formFieldsInfo);
      } catch (e) {
        console.error(e);
        if (e instanceof KintoneRestAPIError) {
          if(e.code === 'GAIA_AP01') {
            toastr.error('アプリを公開してから設定してください', 'エラー');
          } else {
            toastr.error(e.message, 'エラー');
          }
        } else {
          toastr.error(e as string, 'エラー');
        }
        return;
      }

      // charconfig が undefined の時は設定情報反映処理は実行しない
      if(!charconfig) return;

      const config: PluginSetting = JSON.parse(charconfig);
      // カスタマイズ設定がある時の処理
      if(config.customizeSetting) {
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
