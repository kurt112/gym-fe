import { MembershipWithUser } from "./MembershipWithUser"

export interface Membership {
    id?: string,
    code: string,
    price: number,
    membershipPromoExpiration: string | Date | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    durationDescription: string,
    name: string,
    year: number,
    day: number,
    week: number,
    month: number,
    charge: string,
    members: MembershipWithUser[]
}