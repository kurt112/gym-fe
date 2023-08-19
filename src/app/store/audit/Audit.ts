import { User } from "global/utils/user";

export interface Audit {
    id: string,
    message: string,
    action: string,
    createdAt: string,
    user?: User,
    customer?: User,
}