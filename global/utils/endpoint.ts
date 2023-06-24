import { environment } from "src/environments/environment";

export const updateAttendanceCustomer = (rfId: string) => `http://localhost:8080/api/v1/customers/attendance/${rfId}`;

export const enrollInMembership = (id: string) => `${environment.apiUrl}gym/memberships/${id}/enroll-customer/`
export const enrollInGymClass = (id: string) => `${environment.apiUrl}gym/classes/${id}/enroll-customer/`