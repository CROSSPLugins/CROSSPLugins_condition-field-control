import { css } from '@emotion/react';

import LicenseInfoForm from './LicenseInfoForm';
import LicenseRegisterForm from './LicenseRegisterForm';
import SoftwareLicense from './SoftwareLicense';

const style = {
  container: css({
    padding: '10px',
    boxSizing: 'border-box',
    minHeight: '600px'
  }),
  toggle: (_: boolean) => !_ && css({ display: 'none'})
};

export default (props: { show: boolean }) => {
  return (
    <div css={[style.container, style.toggle(props.show)]}>
      <LicenseInfoForm />
      <LicenseRegisterForm />
      <SoftwareLicense />
    </div>
  );
};