export interface IUser {
    id: number
    email: string
    role: string
}

export enum UserRoles {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    USER = "USER"
}