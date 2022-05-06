import { format } from "date-fns";

const convertMsToDays = (ms: number) => {
  const msInOneSecond = 1000;
  const secondsInOneMinute = 60;
  const minutesInOneHour = 60;
  const hoursInOneDay = 24;

  const minutesInOneDay = hoursInOneDay * minutesInOneHour;
  const secondsInOneDay = secondsInOneMinute * minutesInOneDay;
  const msInOneDay = msInOneSecond * secondsInOneDay;

  return Math.ceil(ms / msInOneDay);
};

export const getDaysBetweenDates = (dateOne: Date, dateTwo: Date) => {
  let differenceInMs = dateTwo.getTime() - dateOne.getTime();

  if (differenceInMs < 0) {
    differenceInMs = dateOne.getTime() - dateTwo.getTime();
  }

  return convertMsToDays(differenceInMs);
};

//   const dateOne = new Date("01/01/2021") // MM/DD/YYYY
//   const dateTwo = new Date("01/11/2021") // MM/DD/YYYY

//   getDaysBetweenDates(dateOne, dateTwo) // 10

type Day = {
  day: number;
  month: number;
  year: number;
};

export const getDateElementFromDateDNS = (dayElement: Day) => {
  return format(
    new Date(dayElement.day, dayElement.month - 1, dayElement.year),
    "dd.MM.yyyy"
  );
};
