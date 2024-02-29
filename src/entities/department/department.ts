export interface InstitutesModel {
    id: number,
    name: string
}

export interface DepartmentInfo {
    id: number
    equipment: string
    area: string
    institute: string
}

export type fetchAllInfoDepartmentT = {
    skip: number
    take: number
}