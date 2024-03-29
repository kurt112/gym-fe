export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    middleName: string,
    suffix: string,
    email: string,
    password?: string,
    cellphone: string,
    sex: string,
    birthDate: string | Date | null,
    rfID: string,
    bmi: string,
    bmiNumber: string,
    weight: string,
    height: string,
    isMember?: string,
    membershipDateStart?: string,
    membershipDateEnd?: string,
    createdAt?: string,
    updatedAt?: string,
    role: string,
    pointsAmount: number,
    cardValue: number
}


export const getInitUser:User = {
    birthDate: new Date(Date.now()).toString(),
    firstName: '',
    lastName: '',
    suffix: '',
    email: '',
    password: '',
    cellphone: '',
    sex: '',
    rfID: '',
    bmi: '',
    bmiNumber: '',
    weight: '',
    height: '',
    middleName: '',
    role: '',
    cardValue: 0,
    pointsAmount: 0,
}


export const userRole = {
    'ADMIN': 1,
    'COACH': 2,
    'FRONT_DESK': 3,
    'CUSTOMER': 4
}; 