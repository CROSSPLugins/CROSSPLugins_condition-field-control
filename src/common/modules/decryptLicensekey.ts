import crypto from 'crypto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import decryptConfig from '../../common/config/config.json';

const alg = 'aes-256-cbc';
const encoding = 'hex';

const decrypt = (cText: string) => {
  const iv = crypto.pbkdf2Sync(decryptConfig.pw, decryptConfig.slt, 1000, 16, 'sha256');
  const decipher = crypto.createDecipheriv(alg, decryptConfig.pw, iv);
  let dec = decipher.update(cText, encoding, 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

const getLicenseInfoObject = (licenseInfo: string): LicenseInfo => {
  // ライセンスキー元文字列：{顧客番号}_{プラグインコード}_{利用期限}_{契約サブドメイン名}
  const [customerNumber, pluginCode, expirationDateUnixTime, subDomainName] = licenseInfo.split('_');
  return {
    pluginCode: pluginCode,
    customerNumber: customerNumber,
    subDomainName: subDomainName,
    expirationDateUnixTime: Number(expirationDateUnixTime)
  };
};

/**
 * ライセンスキーからライセンス情報を取得する
 * @param {string} licensekey ライセンスキー文字列
 * @returns
 */
const decryptLicensekey = (licensekey: string): LicenseInfo => {
  try {
    const licensekeyInfo = decrypt(licensekey);
    return getLicenseInfoObject(licensekeyInfo);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default decryptLicensekey;