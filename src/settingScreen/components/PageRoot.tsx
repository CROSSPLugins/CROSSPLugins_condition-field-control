import { useState } from 'react';
import { css } from '@emotion/react';

import PluginSetting from './PluginSetting';
import SystemInfo from './SystemInfo';

const SELECTED_TAB_COLOR = '#a6a6a6';
const style = {
  tab: css({
    display: 'flex',
    div: {
      userSelect: 'none',
      padding: '5px 15px'
    }
  }),
  selected: css({
    backgroundColor: SELECTED_TAB_COLOR,
    color: 'white'
  }),
  select: css({
    cursor: 'pointer',
    backgroundColor: '#f3f3f3'
  }),
  content: css({
    border: `1px solid ${SELECTED_TAB_COLOR}`
  })
};

export default () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      {/* タブ */}
      <div css={style.tab}>
        <div
          css={selectedTab == 0 ? style.selected : style.select}
          onClick={() => {
            setSelectedTab(0);
          }}
        >
          プラグイン設定
        </div>
        <div
          css={selectedTab == 1 ? style.selected : style.select}
          onClick={() => {
            setSelectedTab(1);
          }}
        >
          システム情報
        </div>
      </div>
      {/* コンテンツ */}
      <div css={style.content}>
        <PluginSetting show={selectedTab === 0} />
        <SystemInfo show={selectedTab === 1} />
      </div>
    </div>
  );
};
