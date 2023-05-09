import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOfAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOfAfter);

/**
 * 式を作成して実行する
 *  lterm … フィールド値
 *  rterm … プラグイン設定値
 */
export const executeAndCreateExpression = (lterm: any, op: string, rterm: any, fieldType: string): boolean => {
  switch (fieldType) {
    case 'SINGLE_LINE_TEXT':
    case 'LINK':
      switch (op) {
        case '＝（等しい）':
          return lterm === rterm;
        case '≠（等しくない）':
          return lterm !== rterm;
        case '次のキーワードを含む':
          return new RegExp(rterm).test(lterm);
        case '次のキーワードを含まない':
          return !(new RegExp(rterm).test(lterm));
        default:
          throw new Error('想定外のエラーが発生しました');
      }
    case 'CATEGORY':
      switch (op) {
        case '次のカテゴリーを含む':
          return lterm.some((e: string) => e === rterm);
        case '次のカテゴリーを含まない':
          return !lterm.some((e: string) => e === rterm);
        default:
          throw new Error('想定外のエラーが発生しました');
      }
    case 'NUMBER':
    case 'CALC':
    case 'RECORD_NUMBER':
      switch (op) {
        case '＝（等しい）':
          return lterm === rterm;
        case '≠（等しくない）':
          return lterm !== rterm;
        case '≧（以上）':
          return lterm >= rterm;
        case '≦（以下）':
          return lterm <= rterm;
        default:
          throw new Error('想定外のエラーが発生しました');
      }
    case 'MULTI_LINE_TEXT':
      switch (op) {
        case '次のキーワードを含む':
          return new RegExp(rterm).test(lterm);
        case '次のキーワードを含まない':
          return !(new RegExp(rterm).test(lterm));
        default:
          throw new Error('想定外のエラーが発生しました');
      }
    case 'CHECK_BOX':
    case 'RADIO_BUTTON':
    case 'MULTI_SELECT':
      switch (op) {
        case '次のいずれかを含む':
          return lterm.some((e: string) => rterm.some((f: string) => e === f));
        case '次のいずれかを含まない':
          return !lterm.some((e: string) => rterm.some((f: string) => e === f));
        default:
          throw new Error('想定外のエラーが発生しました');
      }
    case 'DROP_DOWN':
      switch (op) {
        case '次のいずれかを含む':
          return rterm.some((e: string) => e === lterm);
        case '次のいずれかを含まない':
          return !rterm.some((e: string) => e === lterm);
        default:
          throw new Error('想定外のエラーが発生しました');
      }
    case 'DATE': {
      if (!lterm) return false;
      let rValue;
      switch (rterm) {
        case 'today':
          rValue = dayjs();
          break;
        case 'yesterday':
          rValue = dayjs().subtract(1, 'day');
          break;
        case 'tomorrow':
          rValue = dayjs().add(1, 'day');
          break;
        default:
          rValue = dayjs(rterm);
      }
      switch (op) {
        case '＝（等しい）':
          return dayjs(lterm).isSame(rValue, 'day');
        case '≠（等しくない）':
          return !dayjs(lterm).isSame(rValue, 'day');
        case '≧（以降）':
          return dayjs(lterm).isSameOrAfter(rValue, 'day');
        case '≦（以前）':
          return dayjs(lterm).isSameOrBefore(rValue, 'day');
        default:
          throw new Error('想定外のエラーが発生しました');
      }
    }
    case 'TIME': {
      if (!lterm) return false;
      const lValue = dayjs().hour(lterm.split(':')[0]).minute(lterm.split(':')[1]);
      let rValue;
      switch (rterm) {
        case 'now':
          rValue = dayjs();
          break;
        default:
          rValue = dayjs().hour(rterm.split(':')[0]).minute(rterm.split(':')[1]);
      }
      switch (op) {
        case '＝（等しい）':
          return lValue.isSame(rValue, 'minute');
        case '≠（等しくない）':
          return !lValue.isSame(rValue, 'minute');
        case '≧（以降）':
          return lValue.isSameOrAfter(rValue, 'minute');
        case '≦（以前）':
          return lValue.isSameOrBefore(rValue, 'minute');
        default:
          throw new Error('想定外のエラーが発生しました');
      }
    }
    case 'DATETIME':
    case 'CREATED_TIME':
    case 'UPDATED_TIME': {
      if (!lterm) return false;
      switch (rterm) {
        case 'today': {
          const rValue = dayjs();
          switch (op) {
            case '＝（等しい）':
              return dayjs(lterm).isSame(rValue, 'day');
            case '≠（等しくない）':
              return !dayjs(lterm).isSame(rValue, 'day');
            case '≧（以降）':
              return dayjs(lterm).isSameOrAfter(rValue, 'day');
            case '≦（以前）':
              return dayjs(lterm).isSameOrBefore(rValue, 'day');
            default:
              throw new Error('想定外のエラーが発生しました');
          }
        }
        case 'yesterday': {
          const rValue = dayjs().subtract(1, 'd');
          switch (op) {
            case '＝（等しい）':
              return dayjs(lterm).isSame(rValue, 'day');
            case '≠（等しくない）':
              return !dayjs(lterm).isSame(rValue, 'day');
            case '≧（以降）':
              return dayjs(lterm).isSameOrAfter(rValue, 'day');
            case '≦（以前）':
              return dayjs(lterm).isSameOrBefore(rValue, 'day');
            default:
              throw new Error('想定外のエラーが発生しました');
          }
        }
        case 'tomorrow': {
          const rValue = dayjs().add(1, 'd');
          switch (op) {
            case '＝（等しい）':
              return dayjs(lterm).isSame(rValue, 'day');
            case '≠（等しくない）':
              return !dayjs(lterm).isSame(rValue, 'day');
            case '≧（以降）':
              return dayjs(lterm).isSameOrAfter(rValue, 'day');
            case '≦（以前）':
              return dayjs(lterm).isSameOrBefore(rValue, 'day');
            default:
              throw new Error('想定外のエラーが発生しました');
          }
        }
        case 'now': {
          const rValue = dayjs();
          switch (op) {
            case '＝（等しい）':
              return dayjs(lterm).isSame(rValue, 'minute');
            case '≠（等しくない）':
              return !dayjs(lterm).isSame(rValue, 'minute');
            case '≧（以降）':
              return dayjs(lterm).isSameOrAfter(rValue, 'minute');
            case '≦（以前）':
              return dayjs(lterm).isSameOrBefore(rValue, 'minute');
            default:
              throw new Error('想定外のエラーが発生しました');
          }
        }
        default: {
          const rValue = dayjs(rterm);
          switch (op) {
            case '＝（等しい）':
              return dayjs(lterm).isSame(rValue, 'minute');
            case '≠（等しくない）':
              return !dayjs(lterm).isSame(rValue, 'minute');
            case '≧（以降）':
              return dayjs(lterm).isSameOrAfter(rValue, 'minute');
            case '≦（以前）':
              return dayjs(lterm).isSameOrBefore(rValue, 'minute');
            default:
              throw new Error('想定外のエラーが発生しました');
          }
        }
      }
    }
    default:
      throw new Error('想定外のエラーが発生しました')
  }
};