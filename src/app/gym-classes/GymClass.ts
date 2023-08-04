import { Schedule } from "global/utils/schedule"
import { Employee } from "../employee/Employee"

export interface GymClass {
    id?: string,
    name: string,
    type: string,
    session: number,
    dateStart: string | Date | null,
    dateEnd: string | Date | null,
    allowedNonMembers: boolean,
    schedules?: Schedule[],
    instructor?: Employee | null,
    createdAt?: string | Date | null,
    updatedAt?: string | Date | null
}