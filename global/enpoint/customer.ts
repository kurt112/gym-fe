import { environment } from "src/environments/environment";

export const topUpCustomerUrl = (jwt: string,  userId: string, value: number) => `${environment.apiUrl}customers/top-up/${jwt}/${userId}?amount=${value}`
export const getUserIdByCustomerRfId = (rfId: string) => `${environment.apiUrl}customers/get-user-id/${rfId}`