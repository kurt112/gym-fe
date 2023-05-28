import { formatDate } from "@angular/common";

const YYYMMDD = 'yyyy-MM-dd'
const locale = 'en-US'
export const formateDateDDMMYY = (value: string | number | Date,) => {
    return formatDate(value, YYYMMDD,locale);
}