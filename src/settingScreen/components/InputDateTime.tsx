import { globalStyle } from "../style";
import { useState } from 'react';
import { useSkipEffect } from "../utils";

/**
 * @param onChange - Event handler fired when the entered value changes
 */
export default (props: { 
  onChange?: (value: string) => void }
  ) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useSkipEffect(() => {
    props.onChange && props?.onChange(`${date}T${time}:00`);
  },
  [date, time]);

  return (
    <>
      <input type="date" css={globalStyle.inputDateOrTime} value={date} onChange={(event) => {
        setDate(event.target.value);
      }} />
      <input type="time" css={globalStyle.inputDateOrTime} value={time} onChange={(event) => {
        setTime(event.target.value);
      }} />
    </>
  );
};