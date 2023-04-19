import { css } from "@emotion/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSkipEffect } from "../../utils";

const style = {
  checkboxes: css({
    '.kintoneplugin-input-checkbox:last-of-type .kintoneplugin-input-checkbox-item': {
      marginBottom: 0
    }
  })
};

type Props = {
  options: {
    value: string | number
    checked: boolean
  }[]
  onChange?: (value: (string | number)[]) => void
};

export default (props: Props) => {
  const [optionsState, setOptionsState] = useState(props.options.map(e => ({ ...e, relate: uuidv4() })));

  useSkipEffect(() => {
    if(props.onChange) {
      props.onChange(optionsState.filter(e => e.checked).map(e => e.value));
    }
  }, [optionsState]);

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