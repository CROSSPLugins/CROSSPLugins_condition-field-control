import { css } from '@emotion/react';
import { useState } from 'react';
import licenseJSON from '../../../license/license.json';

const style = {
  content: css({
    cursor: 'pointer',
    color: '#1157e1',
    fontSize: '0.9em',
    '&:hover': {
      textDecoration: 'underline'
    }
  }),
  licenseModal: css({
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '100',
    '.crossplugins-license-modal': {
      '&__background': {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)'
      },
      '&__content': {
        position: 'relative',
        top: '50%',
        left: '50%',
        width: '800px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: '5px',
        border: '1px solid rgba(0,0,0,0.3)',
        boxSizing: 'border-box'
      },
      '&__header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '65px',
        padding: '0 1rem 0 1.5rem',
        borderBottom: '1px solid #dee2e6',
        span: {
          fontWeight: 'bold',
          fontSize: 'large',
        },
        '&--close': {
          color: 'rgba(100,100,100,0.8)',
          '&:hover': {
            color: 'rgb(100,100,100)',
            cursor: 'pointer'
          }
        }
      },
      '&__body': {
        minHeight: '300px',
        maxHeight: '600px',
        overflow: 'auto',
        padding: '1rem 2rem'
      },
      '&__footer': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '80px',
        borderTop: '1px solid #dee2e6',
        paddingRight: '1rem',
        '.kintoneplugin-button-dialog-ok': {
          minWidth: '140px'
        }
      },
      '&__summary': {
        cursor: 'pointer'
      },
      '&__license-text': {
        whiteSpace: 'pre-wrap',
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    }
  })
};

export default () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <span css={style.content} onClick={() => { setShow(true) }}>ソフトウェアライセンス</span>
      <div css={style.licenseModal} style={{ display: show ? 'block' : 'none' }} className="crossplugins-license-modal">
        <div className="crossplugins-license-modal__background"></div>
        <div className="crossplugins-license-modal__content">
          <div className="crossplugins-license-modal__header">
            <span>ソフトウェアライセンス</span>
            <svg className="crossplugins-license-modal__header--close" onClick={() => { setShow(false) }}  width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
          <div className="crossplugins-license-modal__body">
            {
              Object.values(licenseJSON).map((e, i) => 
                <details key={i}>
                  <summary className="crossplugins-license-modal__summary">{e.name}</summary>
                  <p className="crossplugins-license-modal__license-text">{e.licenseText}</p>
                </details>
              )
            }
          </div>
          <div className="crossplugins-license-modal__footer">
            <button className="kintoneplugin-button-dialog-ok" onClick={() => { setShow(false) }}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};
