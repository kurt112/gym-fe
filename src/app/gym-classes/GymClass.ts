import { Schedule } from "global/utils/schedule"
import { Employee } from "../employee/Employee"
import { GymClassType } from "../configuration/gym-classes-types/GymClassType"

export interface GymClass {
    id?: string,
    name: string,
    gymClassType: GymClassType,
    session: number,
    dateStart: string | Date | null,
    dateEnd: string | Date | null,
    allowedNonMembers: boolean,
    instructorName?: string,
    schedules?: Schedule[],
    instructor?: Employee | null,
    createdAt?: string | Date | null,
    updatedAt?: string | Date | null
}