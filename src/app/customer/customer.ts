import { User } from "global/utils/user";

export interface Customer {
    id?: number;
    user: User
    membershipDuration?: Date,
    membershipLevel?: string,
    rfId?: string,
    isMember?: boolean,
    isOut?: boolean,
    timeIn?: Date,
    timeOut?: Date,
    createdAt?: Date,
    updatedAt?: Date
}

