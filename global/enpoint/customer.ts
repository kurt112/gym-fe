import { environment } from "src/environments/environment";

const customerEndpoint = `${environment.apiUrl}customers/`

export const topUpCustomerUrl = (jwt: string,  userId: string, value: number) => `${customerEndpoint}top-up/${jwt}/${userId}?amount=${value}`
export const topUpByFirstLastMiddleName = (jwt: string, value: number, firstName: string, lastName: string, middleName: string) => `${customerEndpoint}top-up/${jwt}?amount=${value}&first-name=${firstName}&last-name=${lastName}&middle-name=${middleName}`
export const getUserIdByCustomerRfId = (rfId: string) => `${customerEndpoint}customers/get-user-id/${rfId}`
