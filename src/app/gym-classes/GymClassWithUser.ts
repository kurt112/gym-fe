import { User } from "global/utils/user"

export interface GymClassWithUser {
    id?: string,
    isActive?: boolean,
    session: number,
    dateStart: string | Date | null,
    currentEnroll: User,
    createdAt?: string | Date | null,
    updatedAt?: string | Date | null
}