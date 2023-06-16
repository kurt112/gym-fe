import { User } from "global/utils/user";
import { Membership } from "./Membership";

export interface MembershipWithUser {
    id?: string,
    charge: string | number,
    membership: Membership,
    startDate: Date,
    endDate?: Date,
    lastCharge: Date,
    isActive: boolean,
    price: number,
    currentEnroll: User,
    createdAt?: Date,
    updatedAt?: Date
}