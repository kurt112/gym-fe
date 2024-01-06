import { Employee } from "src/app/employee/Employee"

export interface Schedule {
    id?: string,
    day: number,
    startTime: string | Date,
    endTime: string | Date
    instructor?: Employee
}