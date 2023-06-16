import { environment } from "src/environments/environment";

export const updateAttendanceCustomer = (rfId: string) => `http://localhost:8080/api/v1/customers/attendance/${rfId}`;