import { css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSkipEffect } from "../../utils";

const style = {
  checkboxes: css({
    '.kintoneplugin-input-checkbox:last-of-type .kintoneplugin-input-checkbox-item': {
      marginBottom: 0
    }
  })
};

const usePrevious = <T,>(value: T) => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

type Props = {
  options: {
    value: string | number
    checked: boolean
  }[]
  onChange?: (value: (string | number)[]) => void
};

export default (props: Props) => {
  const [optionsState, setOptionsState] = useState(props.options.map(e => ({ ...e, relate: uuidv4() })));
  const prevOptions = usePrevious(props.options);

  useSkipEffect(() => {
    if(props.onChange) {
      props.onChange(optionsState.filter(e => e.checked).map(e => e.value));
    }
  }, [optionsState]);

  useSkipEffect(() => {
    // onChange が実行された時、options も更新される場合の対処
    // 変更があるか確認
    if (JSON.stringify(prevOptions) !== JSON.stringify(props.options)) {
      setOptionsState(props.options.map(e => ({ ...e, relate: uuidv4() })));
    }
  }, [props.options]);

  return (
    <div className="crossplugins-checkboxes" css={style.checkboxes}>
      {
        optionsState.map(e => (
          <div className="kintoneplugin-input-checkbox" key={e.value}>
            <span className="kintoneplugin-input-checkbox-item">
              <input 
                type="checkbox"
                id={e.relate}
                value={e.value}
                checked={e.checked}
                onChange={(event) => {
                  const _optionsState = optionsState.map(f => {
                    if(f.value === event.target.value) {
                      return { ...f, checked: !f.checked };
                    }
                    return f;
                  })
                  setOptionsState(_optionsState);
                }}
              />
              <label htmlFor={e.relate}>{e.value}</label>
            </span>
          </div>
        ))
      }
    </div>
  );
};