import { formatDate } from "@angular/common";

const YYYMMDD = 'yyyy-MM-dd', longDate = 'MMMM d, y', shortTime = 'HH:mm:ss', longTime = 'HH:mm a'
const locale = 'en-US'
export const formateDateDDMMYY = (value: string | number | Date | null) => {
    if (value == null) return null;
    return formatDate(value, YYYMMDD, locale);
}

export const formatToDateWord = (value: string | number | Date | null) => {
    if (value == null) return null;
    return formatDate(value, longDate, locale);
}

export const formatTimeToShortTime = (value: string | number | Date,) => {
    return formatDate(value, shortTime, locale);
}

export const formatTimeToAmToPm = (value: string | number | Date,) => {
    return formatDate(value, longTime, locale);
}


export const convertNumberToDay = ['SUNDAY','MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

export const yearsDropDown: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const monthsDropDown: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const weeksDropDown: number[] = [0, 1, 2, 3, 4, 5]
export const daysDropDown: number[] = [0, 1, 2, 3, 4, 5, 6, 7];