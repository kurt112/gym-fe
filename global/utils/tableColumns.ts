import { Customer } from "src/app/customer/customer";
import { Employee } from "src/app/employee/Employee";
import { environment } from "src/environments/environment";

// why separate in future the table for will have different url for sorting and etc...
export const customerTableUrl = (search: string,page:number, size:number) => `${environment.apiUrl}customers?search&page=${page}&size=${size}`
export const employeeTableUrl = (search: string,page:number, size:number) => `${environment.apiUrl}employees?search&page=${page}&size=${size}`


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
    pointerPage: number;
}

export const CustomerTable: Table<Customer> = {
    name: `Customer's List`,
    columns: ['First Name','Last Name','Birthdate','Gender','Cellphone','Email','Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search:'',
    pointerPage: 1
}

export const EmployeeTable: Table<Employee> = {
    name: `Employees's List`,
    columns: ['First Name','Last Name','Birthdate','Gender','Cellphone','Email','Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search:'',
    pointerPage: 1
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
    if(table.pointerPage >= table.totalPages) return;
    table.pointerPage = table.pointerPage + 1;
}
export const previous = (table: Table<any>) => {
    if(table.pointerPage - 1 === 0) return;
    table.pointerPage = table.pointerPage - 1;
}

export const changeTableSize = (table: Table<any>, size: number):void => {
    if(size === table.size) return;
    table.size = size;
    table.currentPage = 1;
    table.pointerPage = 1;
    
}

export const updatePageVisit = (table: Table<any>):void => {
    table.pointerPage = table.currentPage;
}


