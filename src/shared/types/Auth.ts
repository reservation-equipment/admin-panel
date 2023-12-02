import {IUser} from "./User.ts";

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}

export interface LogOutResponse {
    refresh_token: string,
    id: number,
    user_id: number
}

export interface LogInRequest {
    email: string,
    password: string
}
