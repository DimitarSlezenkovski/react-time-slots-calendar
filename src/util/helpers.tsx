import { format } from 'date-fns';

// let helpers = {};
// export default helpers;

// helpers.getMomentFromCalendarJSDateElement = (dayElement) => {  // format(new Date(props.initialDate), "yyyy-dd-mm")
//   return moment([
//     dayElement.year,
//     dayElement.month - 1,
//     dayElement.date,
//   ]);
// };

type Day = {
    day: number;
    month: number;
    year: number;
}

export const getDateElementFromDateDNS = (dayElement: Day) => {
    return format(new Date(dayElement.day, dayElement.month - 1, dayElement.year), "dd.MM.yyyy")
}


