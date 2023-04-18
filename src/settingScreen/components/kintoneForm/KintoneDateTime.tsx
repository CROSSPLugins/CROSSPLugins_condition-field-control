import { globalStyle } from "../../style";
import { useState } from 'react';
import { useSkipEffect } from "../../utils";

/**
 * @param onChange - Event handler fired when the entered value changes
 */
export default (props: {
  value: string
  onChange?: (value: string) => void
}) => {
  const [date, setDate] = useState(props.value.split('T')[0]);
  const [time, setTime] = useState(props.value.split('T')[1] ?? '');

  useSkipEffect(() => {
    props.onChange && props?.onChange(`${date}T${time === '' ? time : time.padEnd(8, ':00')}`);
  },[date, time]);

  useSkipEffect(() => {
    setDate(props.value.split('T')[0]);
    setTime(props.value.split('T')[1]);
  },[props.value]);

  return (
    <div style={{ display: 'inline-block' }}>
      <input type="date" css={globalStyle.inputDateOrTime} value={date} onChange={(event) => {
        setDate(event.target.value);
      }} />
      <input type="time" css={globalStyle.inputDateOrTime} value={time} onChange={(event) => {
        setTime(event.target.value);
      }} />
    </div>
  );
};