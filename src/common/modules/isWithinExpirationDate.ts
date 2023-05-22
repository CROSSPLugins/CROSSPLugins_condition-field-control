import dayjs from 'dayjs';

const isWithinExpirationDate = (expirationDateUnixTime: number) => {
  return dayjs().unix() < expirationDateUnixTime;
};

export default isWithinExpirationDate;