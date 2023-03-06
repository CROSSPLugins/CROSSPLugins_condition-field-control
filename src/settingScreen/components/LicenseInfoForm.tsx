import { css } from '@emotion/react';

const TABLE_BORDER = '1px solid #5a5a5a';
const style = {
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

export default () => {
  return (
    <div css={css({ marginBottom: '10px' })}>
      <div css={style.title}>ライセンス情報</div>
      <div css={style.content}>
        <table>
          <tbody>
            <tr>
              <th>顧客番号</th>
              <td>XXXXX</td>
            </tr>
            <tr>
              <th>ライセンス有効期限</th>
              <td>YYYY年MM月DD日</td>
            </tr>
            <tr>
              <th>ステータス</th>
              <td>有効</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
