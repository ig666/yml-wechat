import dayjs from "dayjs";

export const formattYMDHMS = date => {
  let formatt = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  return formatt;
};
