import { ReactNode } from "react";
import { css } from "@emotion/react";

const style = {
  label: css({
    color: 'red',
    fontSize: '0.8rem',
    paddingTop: '3px',
    paddingLeft: '3px'
  }),
  toggle: (_: boolean) => !_ && css({ display: 'none' })
};

type Props = {
  error: boolean
  children: ReactNode
};

export default (props: Props) => {
  return (
    <div css={[style.label, style.toggle(props.error)]}>
      {props.children}
    </div>
  )
};