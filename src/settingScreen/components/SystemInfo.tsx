import { css } from '@emotion/react';

import LicenseInfoForm from './LicenseInfoForm';
import LicenseRegisterForm from './LicenseRegisterForm';
import SoftwareLicense from './SoftwareLicense';

const style = {
  container: css({
    padding: '10px',
    boxSizing: 'border-box'
  }),
  toggle: (_: boolean) => !_ && css({ display: 'none'})
};

export default (props: { show: boolean }) => {
  const haslicensekey = true;

  return (
    <div css={[style.container, style.toggle(props.show)]}>
      {haslicensekey ? <LicenseInfoForm /> : <LicenseRegisterForm />}
      <SoftwareLicense />
    </div>
  );
};
