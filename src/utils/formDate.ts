import dayjs from "dayjs";

export const formattYMDHMS = date => {
  let formatt = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  return formatt;
};

export const formattYMDHM = date => {
  let formatt = dayjs(date).format("YYYY-MM-DD HH:mm");
  return formatt;
};

export const formattYMD = date => {
  let formatt = dayjs(date).format("YYYY-MM-DD");
  return formatt;
};
