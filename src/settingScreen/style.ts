import { css } from "@emotion/react";

const globalStyle = {
  h1: css({
    fontWeight: 'bold',
    fontSize: '1.3rem',
    borderLeftWidth: '5px',
    borderLeftColor: '#000',
    borderLeftStyle: 'solid',
    paddingLeft: '5px',
    marginTop: 0
  }),
  inputDateOrTime: css({
    padding: '10px 5px',
    border: '1px solid #e3e7e8',
    outline: 'none',
    boxShadow: '4px 4px 12px #f5f5f5 inset, -4px -4px 12px #f5f5f5 inset',
    backgroundColor: '#fff',
    verticalAlign: 'top',
    ':focus': {
      borderColor: '#3498db'
    }
  })
};

export { globalStyle };