import { useState } from "react";
import { css } from "@emotion/react";
import { useSkipEffect } from "../../utils";
import KintoneDropDown from "../kintoneForm/KintoneDropDown";
import KintoneTime from "../kintoneForm/KintoneTime";

const specify = 'specify';

const style = {
  dropdown: (_: boolean) => {
    if(!_) return css({
      '.kintoneplugin-dropdown': {
        width: '40px',
        padding: 0,
        minWidth: 'fit-content'
      },
      '.crossplugins-dropdown-selected-item-name': {
        width: '0%',
        padding: 0,
        fontSize: 0
      },
      '.crossplugins-dropdown-selected-item-icon': {
        width: '100%',
        background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUwM0JEQzc5RUZENzExRTNBRjRFQ0I1NjlCRDUzOTA5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUwM0JEQzdBRUZENzExRTNBRjRFQ0I1NjlCRDUzOTA5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTAzQkRDNzdFRkQ3MTFFM0FGNEVDQjU2OUJENTM5MDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTAzQkRDNzhFRkQ3MTFFM0FGNEVDQjU2OUJENTM5MDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7KovlSAAAAhElEQVR42mI0mX7LjoGB4RADccCWCUjsB2ILIhSD1BwAadAB4qNAbIxHsTFUjQ5Iw3UgNgTiU1AaHRggyV1nggpegppyBoj1kBTrAvFZIDaBqmFgQZK8AMRmQHwe6kyYmAVUjAFdAwPUNGsgvgLl2wDxaWQFLFjcfAKIHaHs4+iSAAEGABHGF74RDCRaAAAAAElFTkSuQmCC) no-repeat center center'
      }
    })
  }
};

/**
 * value が「時間指定」であるか判定する
 */
const isSpecifyTime = (value: string): boolean => {
  switch(value) {
    case 'now':
      return false;
    default:
      return true;
  }
};

type Props = {
  value: string | 'now'
  onChange?: (value: string) => void
};

export default (props: Props) => {
  const [isStretchDropDown, changeShape] = useState(!isSpecifyTime(props.value));
  const [time, setTime] = useState(isStretchDropDown ? '' : props.value);
  const [type, setType] = useState(isStretchDropDown ? props.value : specify);

  // CustomTimeForm onChangeイベントハンドラ
  useSkipEffect(() => {
    props.onChange && props.onChange(time);
  }, [time]);
  useSkipEffect(() => {
    if(props.onChange) {
      if(type === specify) {
        props.onChange(time);
      } else {
        props.onChange(type);
      }
    }
  }, [type]);

  return (
    <>
      {
        !isStretchDropDown 
          &&
        <KintoneTime
          value={time}
          onChange={(value) => {
            setTime(value);
          }}
        />
      }
      <KintoneDropDown 
        value={type}
        options={
          [
            { text: '時間指定する', value: specify },
            { text: '今', value: 'now' }
          ]
        }
        overcss={style.dropdown(isStretchDropDown)}
        onChange={(value) => {
          if(value === specify) {
            changeShape(false);
            setType(specify);
          } else {
            changeShape(true);
            setType(value as string);
          }
        }}
      />
    </>
  );
};