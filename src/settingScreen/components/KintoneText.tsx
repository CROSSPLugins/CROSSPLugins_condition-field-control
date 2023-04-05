import { css } from "@emotion/react";
import { useState } from "react";
import { useSkipEffect } from "../utils";

const style = {
  inputText: css({
    '.kintoneplugin-input-text': {
      color: 'black'
    }
  })
};

type Props = {
  value: string
  onChange?: (value: string) => void
};

export default (props: Props) => {
  const [text, setText] = useState(props.value);
  
  useSkipEffect(() => {
    props.onChange && props.onChange(text);
  }, [text]);
  
  return (
    <div className="kintoneplugin-input-outer" css={style.inputText}>
      <input 
        className="kintoneplugin-input-text"
        type="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
    </div>
  );
};