import { css } from '@emotion/react';

const style = {
  title: css({
    borderLeft: '3px solid #358eff',
    paddingLeft: '5px',
    marginBottom: '10px'
  }),
  content: {
    licensekeyForm: css({
      marginBottom: '10px',
      '.kintoneplugin-input-outer': {
        width: '30em',
        '.kintoneplugin-input-text': {
          width: '100%'
        }
      },
      '.kintoneplugin-button-normal': {
        marginLeft: '10px'
      }
    }),
    licensekeyInfoForm: css({
      th: {
        padding: '0 10px',
        fontWeight: 'normal'
      },
      td: {
        textAlign: 'center'
      }
    })
  }
};

export default () => {
  return (
    <div>
      <div css={style.title}>ライセンスキー登録</div>
      <div>
        {/* ライセンスキー入力フォーム */}
        <div css={style.content.licensekeyForm}>
          <div className='kintoneplugin-input-outer'>
            <input className='kintoneplugin-input-text' type='text' />
          </div>
          <button className='kintoneplugin-button-normal'>登録</button>
        </div>
      </div>
    </div>
  );
};
