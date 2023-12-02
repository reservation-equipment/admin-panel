import {AxiosResponse} from 'axios'
import $api from "../api/axios.ts";
import {AuthResponse, LogOutResponse} from "../shared/types/Auth.ts";

export default class AuthService {
    static async signIn(email: string, password: string): Promise<AuthResponse> {
        return $api.post<AuthResponse>("/signIn", {
            email,
            password
        }).then(res => res.data)
    }

    static async signOut(firstName: string, secondName: string, email: string, password: string, role_id: number): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/signOut", {
            role_id,
            first_name: firstName,
            second_name: secondName,
            email,
            password

        })
    }

    static async logOut(): Promise<AxiosResponse<LogOutResponse>> {
        return $api.post<LogOutResponse>("/logOut")
    }
}