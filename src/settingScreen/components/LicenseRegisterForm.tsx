import { css } from '@emotion/react';
import { useState } from 'react';
import decryptLicensekey from '../../common/modules/decryptLicensekey';

import config from '../../common/config/config.json';

const style = {
  content: css({
    width: '1000px'
  }),
  title: css({
    borderLeft: '3px solid #358eff',
    paddingLeft: '5px',
    marginBottom: '10px'
  }),
  form: {
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
  },
  errorMessageForm: css({
    border: '1px solid red',
    backgroundColor: '#fff7f7',
    color: 'red',
    padding: '10px',
    width: '460px'
  })
};

const getErrorMessage = (errorCode: 'E0001' | 'E0002' | 'E0003') => {
  const errorMessages = {
    E0001: 'ライセンスキーを入力してください。',
    E0002: '正しいライセンスキーを入力してください。',
    E0003: '正しいライセンスキーを入力してください。'
  };
  return `${errorCode}: ${errorMessages[errorCode]}`;
};

const isNotSameSubDomainName = (subDomainName: string) => {
  const currentSubDomainName = location.hostname.split('.')[0];
  return currentSubDomainName !== subDomainName;
};

export default () => {
  const [licensekeyValue, setLicensekey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const registerLicensekey = () => {
    // 入力値が空白の場合
    if (licensekeyValue === '') {
      setErrorMessage(getErrorMessage('E0001'));
      return;
    }

    let licenseInfo: LicenseInfo;
    try {
      // ライセンスキー解析処理実行
      licenseInfo = decryptLicensekey(licensekeyValue);
    } catch (e) {
      // 不正なライセンスキーが入力された場合
      setErrorMessage(getErrorMessage('E0002'));
      return;
    }

    // 他のドメインのcybozu.comで利用された場合
    if (isNotSameSubDomainName(licenseInfo.subDomainName)) {
      setErrorMessage(getErrorMessage('E0003'));
      return;
    }

    // 正しいライセンスキーが入力された場合
    // - ライセンスキーをstoreにセット、一覧画面へ遷移する
    // kintone.plugin.app.setConfig({
    //   licensekey: licensekeyValue,
    //   // 各プラグインで利用している設定値を設定
    // });
    console.log('[DEBUG] ライセンスキーを保存');
  };
  return (
    <div css={style.content}>
      <div css={style.title}>ライセンスキー登録</div>
      <div>
        {/* ライセンスキー入力フォーム */}
        <div css={style.form.licensekeyForm}>
          <div className='kintoneplugin-input-outer'>
            <input
              className='kintoneplugin-input-text'
              type='text'
              onChange={(event) => {
                setLicensekey(event.target.value);
              }}
            />
          </div>
          <button type='button' className='kintoneplugin-button-normal' onClick={registerLicensekey}>
            登録
          </button>
        </div>
      </div>
      {/* ライセンスキーに関するエラーメッセージを表示する */}
      {errorMessage !== '' && <div css={style.errorMessageForm}>{errorMessage}</div>}
    </div>
  );
};