import { Customer } from "src/app/customer/customer";
import { Employee } from "src/app/employee/Employee";
import { GymClass } from "src/app/gym-classes/GymClass";
import { GymClassWithUser } from "src/app/gym-classes/GymClassWithUser";
import { Membership } from "src/app/membership/Membership";
import { MembershipWithUser } from "src/app/membership/MembershipWithUser";
import { ScheduleComponent } from "src/app/utility/schedule/schedule.component";
import { environment } from "src/environments/environment";
import { Schedule } from "./schedule";
import { GymClassType } from "src/app/configuration/gym-classes-types/GymClassType";
import { Audit } from "src/app/store/audit/Audit";


// why separate in future the table for will have different url for sorting and etc...
export const customerTableUrl = (search: string, page: number, size: number) => `${environment.apiUrl}customers?search=${search}&page=${page}&size=${size}`;
export const employeeTableUrl = (search: string, page: number, size: number, role?: number) => `${environment.apiUrl}employees?search=${search}&page=${page}&size=${size}${role === undefined ? '' : '&role=' + role}`;
export const gymClassTableUrl = (search: string, page: number, size: number) => `${environment.apiUrl}gym/classes?search=${search}&page=${page}&size=${size}`;
export const membershipTableUrl = (search: string, page: number, size: number) => `${environment.apiUrl}gym/memberships?search=${search}&page=${page}&size=${size}`;
export const customerTodayTableUrl = (search: string, page: number, size: number) => `${environment.apiUrl}customers/today?search=${search}&page=${page}&size=${size}`;
export const membershipMembersTableUrl = (membershipId: string | null, search: string, page: number, size: number) => `${environment.apiUrl}gym/memberships/${membershipId}/members?search=${search}&page=${page}&size=${size}`;
export const gymClassMembers = (gymClassId: string | null, search: string, page: number, size: number) => `${environment.apiUrl}gym/classes/${gymClassId}/members?search=${search}&page=${page}&size=${size}`;
export const GymClassScheduleTableUrl = (gymClassId: string | null) => `${environment.apiUrl}gym/classes/${gymClassId}/schedules`;
export const auditTrailTableUrl = (search: string, page: number, size: number, startDate: string | null, endDate: string | null) => `${environment.apiUrl}audit/${startDate}/${endDate}?search=${search}&page=${page}&size=${size}`;
export const todayScheduleTalbeUrl = (storeId: string) => `${environment.apiUrl}gym/${storeId}/today-schedule`;

export interface Table<T> {
    name: string,
    columns: string[],
    size: number,
    totalElements: number,
    numberOfElements: number,
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
    columns: ['First Name', 'Last Name', 'Birthdate', 'Gender', 'Cellphone', 'Email', 'Status', 'Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const EmployeeTable: Table<Employee> = {
    name: `Employees's List`,
    columns: ['First Name', 'Last Name', 'Birthdate', 'Gender', 'Cellphone', 'Email', 'Role', 'Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const CoachTableModal: Table<Employee> = {
    name: `Employees's List`,
    columns: ['Id', 'First Name', 'Last Name', 'Email', 'Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const GymClassTable: Table<GymClass> = {
    name: `Gym Classe's`,
    columns: ['Class Name', 'Class Type', 'Instructor', 'Date Start', 'Date End', 'Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}
export const MembershipTable: Table<Membership> = {
    name: `Membership`,
    columns: ['Name', 'Code', 'Price', 'Date Created', 'Expiration', 'Payment Type', 'Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const MembershipWithUserTable: Table<MembershipWithUser> = {
    name: `Member's`,
    columns: ['First Name', 'Last Name', 'Price', 'Payment every', 'Start Date', 'End Date', 'Last Charge'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const CustomerAttendanceTable: Table<Customer> = {
    name: `Today's Customer`,
    columns: ['FirstName', 'LastName', 'Balance', 'Points', 'Time In', 'Time Out', 'Membership Expiration'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const GymClassScheduleTable: Table<Schedule> = {
    name: `Gym Class Schedule's`,
    columns: ['Day', 'Time Start', 'Time End', 'Date', 'Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const GymClassWithUserTable: Table<GymClassWithUser> = {
    name: `Today's Customer`,
    columns: ['FirstName', 'LastName', 'Date Start', 'Session'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const GymClassesTypes: Table<GymClassType> = {
    name: `Gym Classes Types`,
    columns: ['Name', 'Date Created', 'Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const AuditTable: Table<Audit> = {
    name: `Audit Trail`,
    columns: ['Message', 'Date Created', 'Action'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const ScheduleTodayTable: Table<Schedule> = {
    name: `Today Schedule's`,
    columns: ['Start Time', 'End Time', 'Instructor'],
    numberOfElements: 1,
    size: 10,
    totalElements: 10,
    totalPages: 10,
    content: [],
    currentPage: 1,
    previousPage: 0,
    nextPage: 3,
    search: '',
    pointerPage: 1
}

export const convertDataFromRequestToTable = (data: any, table: Table<any>) => {
    let { content, numberOfElements, size, totalElements, totalPages, pageNumber } = data;
    if (size === undefined) {
        size = 10;
    }


    table.content = content;
    table.size = size;
    table.numberOfElements = numberOfElements;
    table.totalElements = totalElements;
    table.totalPages = totalPages;
}

// next in pagination
export const next = (table: Table<any>): void => {
    if (table.pointerPage >= table.totalPages) return;
    table.pointerPage = table.pointerPage + 1;
}
export const previous = (table: Table<any>) => {
    if (table.pointerPage - 1 === 0) return;
    table.pointerPage = table.pointerPage - 1;
}

export const changeTableSize = (table: Table<any>, size: number): void => {
    if (size === table.size) return;
    table.size = size;
    table.currentPage = 1;
    table.pointerPage = 1;

}

export const updatePageVisit = (table: Table<any>): void => {
    table.pointerPage = table.currentPage;
}


