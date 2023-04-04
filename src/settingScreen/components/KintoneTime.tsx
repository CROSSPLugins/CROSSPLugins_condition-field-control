import { globalStyle } from "../style";
import { useState } from 'react';
import { useSkipEffect } from "../utils";

/**
 * @param onChange - Event handler fired when the entered value changes
 */
export default (props: {
  value: string
  onChange?: (value: string) => void }
  ) => {
  const [time, setDate] = useState(props.value);

  useSkipEffect(() => {
    props.onChange && props?.onChange(`${time}`);
  },
  [time]);

  useSkipEffect(() => {
    setDate(props.value);
  }, [props.value]);

  return (
    <input type="time" css={globalStyle.inputDateOrTime} value={time} onChange={(event) => {
      setDate(event.target.value);
    }} />
  );
};