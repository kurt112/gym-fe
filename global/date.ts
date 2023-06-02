import { formatDate } from "@angular/common";

const YYYMMDD = 'yyyy-MM-dd', longDate = 'MMMM d, y', shortTime = 'HH:mm:ss'
const locale = 'en-US'
export const formateDateDDMMYY = (value: string | number | Date,) => {
    return formatDate(value, YYYMMDD,locale);
}

export const formatToDateWord = (value: string | number | Date,) => {
    return formatDate(value, longDate,locale);
}

export const formatTimeToShortTime = (value: string | number | Date,) => {
    return formatDate(value, shortTime,locale);
}


export const convertNumberToDay = ['MONDAY','TUESDAY', 'WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']

