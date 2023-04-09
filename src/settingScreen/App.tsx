import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { PluginSetting } from '../type';
import PageRoot from './components/PageRoot';
import { fieldControlList } from './store';

type Props = {
  pluginId: string
};

export default (props: Props) => {
  const setFieldControlList = useSetRecoilState(fieldControlList);

  useEffect(() => {
    const config: PluginSetting = kintone.plugin.app.getConfig(props.pluginId);

    // カスタマイズ設定がある時の処理
    if(config.customizeSetting) {
      // 保存済みの設定を反映[フィールド制御対象一覧]
      setFieldControlList(
        config.customizeSetting.fieldControlList.map(e => {
          return {
            ...e,
            id: uuidv4(),
            config: e.config.map(f => {
              return {
                ...f,
                id: uuidv4()
              }
            })
          }
        })
      );
    }
  },[]);

  return <PageRoot />;
};
