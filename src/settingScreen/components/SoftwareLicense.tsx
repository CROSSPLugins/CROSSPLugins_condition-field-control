import { css } from '@emotion/react';

const style = {
  content: css({
    cursor: 'pointer',
    color: '#1157e1',
    fontSize: '0.9em',
    '&:hover': {
      textDecoration: 'underline'
    }
  })
};

export default () => {
  return (
    <div>
      <span css={style.content}>ソフトウェアライセンス</span>
    </div>
  );
};
