import { css, SerializedStyles } from "@emotion/react";
import { useState, useRef, useEffect } from 'react';
import { useSkipEffect } from "../utils";

const style = {
  outer: css({
    position: 'relative',
    userSelect: 'none'
  }),
  selected: css({
    verticalAlign: 'top',
    width: '200px',
    '.crossplugins-dropdown-selected': {
      display: 'flex',
      '&-item-name': {
        width: '80%',
        fontSize: '14px',
        lineHeight: '48px',
        paddingLeft: '6px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      '&-item-icon': {
        width: '20%',
        background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUwM0JEQzc5RUZENzExRTNBRjRFQ0I1NjlCRDUzOTA5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUwM0JEQzdBRUZENzExRTNBRjRFQ0I1NjlCRDUzOTA5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTAzQkRDNzdFRkQ3MTFFM0FGNEVDQjU2OUJENTM5MDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTAzQkRDNzhFRkQ3MTFFM0FGNEVDQjU2OUJENTM5MDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7KovlSAAAAhElEQVR42mI0mX7LjoGB4RADccCWCUjsB2ILIhSD1BwAadAB4qNAbIxHsTFUjQ5Iw3UgNgTiU1AaHRggyV1nggpegppyBoj1kBTrAvFZIDaBqmFgQZK8AMRmQHwe6kyYmAVUjAFdAwPUNGsgvgLl2wDxaWQFLFjcfAKIHaHs4+iSAAEGABHGF74RDCRaAAAAAElFTkSuQmCC) no-repeat right center'
      }
    }
  }),
  list: css({
    position: 'absolute',
    padding: '8px 0 8px 0',
    zIndex: 1,
    '.kintoneplugin-dropdown-list-item': {
      padding: '6px 16px 8px 25px',
      ':hover': {
        backgroundColor: '#e2f2fe'
      },
    },
    ':hover .kintoneplugin-dropdown-list-item:not(:hover)': {
      backgroundColor: 'transparent'
    },
    '.kintoneplugin-dropdown-list-item-selected': {
      background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFNDNBMDI0MEIxNjExRTQ5MUVFOTIwNzZCRTVEQkEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFNDNBMDI1MEIxNjExRTQ5MUVFOTIwNzZCRTVEQkEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUU0M0EwMjIwQjE2MTFFNDkxRUU5MjA3NkJFNURCQTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUU0M0EwMjMwQjE2MTFFNDkxRUU5MjA3NkJFNURCQTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4n981NAAABVElEQVR42mL4//8/AzH44Ydf7D///AOzidJw9eV3Ps/F9392H32V8enHH0ZGsE484Pbbn1y5255/vfb6BwPIpnkBstpMIImvv/8xXnn1gx9dw623P7mztzz7evPNTwZmIN9Onue+DB/rM6a33/4wtR163Zq+6emHY4++ScE03Hjzkweo4cvNtz8Z/v77z2AizXV/gqekur4ExwfG9dc+GiZueHKOj52JQY6fjWGip6QIFxvTz4Jtzz9ff/ODAaiewRykwUtSA2jLL5CBjLfe/OTqPPJq7e47XzzYWZgYFAVZGbhYmRguv/zJ8PPvPwwNYE2ggHj//S9T2a4XW3fc+ewBshFk+tdf/xhMpbmeTvKSVJTmY/2N7Fd46L0DaizfDdR4+7MHiG+GQwMYIMcHKFAiVz86D4qTJx9/seKKN4x4evnlD8vPv/+Z5fhZf+KKO4AAAwB1mv8yxhgabQAAAABJRU5ErkJggg==) no-repeat 7px 8px',
      backgroundColor: '#e2f2fe'
    }
  }),
  toggle: (_: boolean) => !_ && css({ display: 'none' }),
  disable: (_?: boolean) => _ && css({
    '.kintoneplugin-dropdown': {
      color: '#888',
      backgroundColor: '#d4d7d7',
      boxShadow: 'none'
    },
    '.kintoneplugin-dropdown:hover': {
      cursor: 'not-allowed'
    },
    '.kintoneplugin-dropdown:active': {
      pointerEvents: 'none'
    }
  })
};

type Option = {
  text: string | number
  value: string | number
};

const unselectValue = '-----';
const setUnselectValue = (isSet?: boolean): (Option & { select: boolean })[] => isSet ? [{ value: '', text: unselectValue, select: false }] : [];

type Props = {
  value: string | number
  options: Option[]
  onChange?: (value: string | number) => void
  unselectValue?: boolean
  overcss?: SerializedStyles
  disabled?: boolean
};

/**
 * unselectValue … 選択肢に { text: '-----', value: '' } が先頭に自動的に追加される
 */
export default (props: Props) => {
  const [show, setShow] = useState(false);

  const [selectValue, setSelectValue] = useState(props.value);
  
  const [selectState, setSelectState] = useState(
    [
      ...setUnselectValue(props?.unselectValue),
      ...props.options.map(e => ({ ...e, select: false }))
    ]
    .map(e => e.value === selectValue ? ({ ...e, select: true }) : ({ ...e, select: false }))
  );

  // ドロップダウンの枠外 及び ドロップダウン自身をクリックした時の選択肢の表示/非表示
  const insideRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = insideRef.current;

    if(!el) return;

    const handleClickOutSide = (e: MouseEvent) => {
      if(!el?.contains(e.target as Node)) {
        setShow(false);
      } else {
        setShow(current => !current);
      }
    };

    document.addEventListener('click', handleClickOutSide);

    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, [insideRef]);

  // KintoneDropDown onChangeイベントハンドラ
  useSkipEffect(() => {
    props.onChange && props.onChange(selectValue);
  }, [selectValue]);

  // props.options の値が変化した時のハンドラ
  useSkipEffect(() => {
    setSelectState(
      [
        ...setUnselectValue(props?.unselectValue),
        ...props.options.map(e => ({ ...e, select: false }))
      ]
      .map(e => e.value === selectValue ? ({ ...e, select: true }) : ({ ...e, select: false }))
    );
  }, [props.options]);

  return (
    <div className="kintoneplugin-dropdown-outer" css={[style.outer, props.overcss, style.disable(props.disabled)]}>
      <div className="kintoneplugin-dropdown" css={style.selected} ref={insideRef}>
        <div className="crossplugins-dropdown-selected">
          <div className="crossplugins-dropdown-selected-item-name">
            {selectState.find(e => e.value === selectValue)?.text ?? unselectValue}
          </div>
          <div className="crossplugins-dropdown-selected-item-icon"></div>
        </div>
      </div>
      <div className="kintoneplugin-dropdown-list" css={[style.list, style.toggle(show)]}>
        {
          selectState.map((e, i) => (
            <div
              key={i}
              className={`kintoneplugin-dropdown-list-item ${e.select ? 'kintoneplugin-dropdown-list-item-selected' : ''}`}
              onClick={() => {
                const _selectState = selectState.map((f, y) => y === i ? ({ ...f, select: true }) : ({ ...f, select: false }));
                setSelectState(_selectState);
                setSelectValue(e.value);
              }}>
              <span className="kintoneplugin-dropdown-list-item-name">{e.text}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
};