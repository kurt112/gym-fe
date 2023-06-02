import { Schedule } from "global/utils/schedule"
import { Employee } from "../employee/Employee"

export interface GymClass{
    id?: string,
    name: string,
    type: string,
    dateStart: string | Date,
    dateEnd: string | Date,
    schedules: Schedule[],
    instructor?: Employee | null,
    createdAt?: string | Date,
    updatedAt?: string | Date
}