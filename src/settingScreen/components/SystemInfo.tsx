import { css } from '@emotion/react';

import LicenseInfoForm from './LicenseInfoForm';
import LicenseRegisterForm from './LicenseRegisterForm';
import SoftwareLicense from './SoftwareLicense';

const style = {
  container: css({
    padding: '10px',
    boxSizing: 'border-box'
  })
};

export default () => {
  const haslicensekey = true;

  return (
    <div css={style.container}>
      {haslicensekey ? <LicenseInfoForm /> : <LicenseRegisterForm />}
      <SoftwareLicense />
    </div>
  );
};
