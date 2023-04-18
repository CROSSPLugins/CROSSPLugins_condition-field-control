import { globalStyle } from "../../style";
import { useState } from 'react';
import { useSkipEffect } from "../../utils";

/**
 * @param onChange - Event handler fired when the entered value changes
 */
export default (props: {
  value: string
  onChange?: (value: string) => void }
  ) => {
  const [date, setDate] = useState(props.value);

  useSkipEffect(() => {
    props.onChange && props?.onChange(`${date}`);
  },
  [date]);

  useSkipEffect(() => {
    setDate(props.value);
  }, [props.value]);

  return (
    <input type="date" css={globalStyle.inputDateOrTime} value={date} onChange={(event) => {
      setDate(event.target.value);
    }} />
  );
};