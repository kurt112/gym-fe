import { Customer } from "src/app/customer/customer";
import { environment } from "src/environments/environment";

export const customerTableUrl = (search: string,page:number, size:number) => `${environment.apiUrl}customers?search&page=${page}&size=${size}`

interface Table<T>{
    name: string,
    columns: string[],
    size: number,
    totalElements: number,
    numberOfElements:number,
    totalPages: number,
    content: T[],
    currentPage: number,
    previousPage: number,
    nextPage: number,
    search: string
}

export const CustomerTable: Table<Customer> = {
    name: `Customer's List`,
    columns: ['First Name','Last Name','Birthdate','Gender','Cellphone','Email','Action'],
    numberOfElements: 1,
    size: 1,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search:'',
}

export const convertDataFromRequestToTable = (data: any, table: Table<any>) => {
    const {content,numberOfElements,size,totalElements,totalPages,pageNumber} = data;

    table.content = content;
    table.size = size;
    table.numberOfElements = numberOfElements;
    table.totalElements = totalElements;
    table.totalPages = totalPages;
}

// next in pagination
export const next = (table: Table<any>):void => {
    if(table.currentPage >= table.totalPages) return;
    table.currentPage = table.currentPage + 1;
}
export const previous = (table: Table<any>) => {
    if(table.currentPage - 1 === 0) return;
    table.currentPage = table.currentPage - 1;
}


