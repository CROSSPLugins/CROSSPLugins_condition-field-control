import { css } from '@emotion/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import isWithinExpirationDate from '../../common/modules/isWithinExpirationDate';
import decryptLicensekey from '../../common/modules/decryptLicensekey';
import Licensekey from '../store/Licensekey';

const TABLE_BORDER = '1px solid #5a5a5a';
const style = {
  form: css({
    marginBottom: '10px',
    paddingBottom: '30px'
  }),
  title: css({
    borderLeft: '3px solid #358eff',
    paddingLeft: '5px',
    marginBottom: '10px'
  }),
  content: css({
    table: {
      border: TABLE_BORDER,
      borderCollapse: 'collapse',
      th: {
        fontWeight: 'normal',
        border: TABLE_BORDER,
        textAlign: 'left',
        paddingLeft: '5px',
        width: '12em',
        boxSizing: 'border-box',
        backgroundColor: '#ebebeb'
      },
      td: {
        border: TABLE_BORDER,
        paddingLeft: '5px',
        width: '12em',
        boxSizing: 'border-box'
      }
    }
  })
};

const getExpirationDateText = (expirationDateUnixTime: number) => {
  const tz = kintone.getLoginUser().timezone;
  return dayjs.unix(expirationDateUnixTime).add(-1, 'day').tz(tz).format('YYYY年M月D日');
};

const getLicenseStatus = (expirationDateUnixTime: number) => {
  return isWithinExpirationDate(expirationDateUnixTime) ? '有効' : '無効';
};

export default () => {
  const [licensekey] = useRecoilState(Licensekey);

  const [customerNumber, setCustomerNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [status, setStatus] = useState('');

  const hasLicensekey = () => {
    return licensekey !== '';
  };

  // ライセンスキーから情報取得しセットする。（ライセンスキーが入力済みの場合）
  useEffect(() => {
    if (!hasLicensekey()) {
      return;
    }
    const licenseInfo = decryptLicensekey(licensekey);
    setCustomerNumber(licenseInfo.customerNumber);
    setExpirationDate(getExpirationDateText(licenseInfo.expirationDateUnixTime));
    setStatus(getLicenseStatus(licenseInfo.expirationDateUnixTime));
  }, []);

  return (
    <>
      {hasLicensekey() ? (
        <div css={style.form}>
          <div css={style.title}>ライセンス情報</div>
          <div css={style.content}>
            <table>
              <tbody>
                <tr>
                  <th>顧客番号</th>
                  <td>{customerNumber}</td>
                </tr>
                <tr>
                  <th>有効期限</th>
                  <td>{expirationDate}</td>
                </tr>
                <tr>
                  <th>ライセンス利用状態</th>
                  <td>{status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};