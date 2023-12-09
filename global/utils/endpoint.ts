import { environment } from "src/environments/environment";

export const enrollInMembership = (id: string) => `${environment.apiUrl}gym/memberships/${id}/enroll-customer/`
export const enrollInGymClass = (id: string) => `${environment.apiUrl}gym/classes/${id}/enroll-customer/`

// ---------------------------------------------------------------- Auto Complete ----------------------------------------------------------------
export const autoCompleteEmployee =  (search: string) => `${environment.apiUrl}employees/autocomplete?search=${search}`

// ---------------------------------------------------------------- Login Endpoint ----------------------------------------------------------------
export const loginByUserNameAndPassword =  () => `${environment.apiUrl}auth/login`

// ---------------------------------------------------------------- For Customer  ----------------------------------------------------------------
export const updateAttendanceCustomer = (rfId: string) => `${environment.apiUrl}customers/attendance/${rfId}`;
export const udpateAttendanceByFirstNameLastNameandMiddleName = (firstName: string, lastName: string, middleName: string) => `${environment.apiUrl}customers/attendance?
first-name=${firstName}&last-name=${lastName}&middle-name=${middleName}`;
