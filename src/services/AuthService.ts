import {AxiosResponse} from 'axios'
import $api from "../api/axios.ts";
import {LogOutResponse} from "../shared/types/Auth.ts";

export default class AuthService {
    static async signIn(email: string, password: string) {
        return $api.post("/signIn", {
            email,
            password
        }).then(res => res.data)
    }

    static async signOut(firstName: string, secondName: string, email: string, password: string, role_id: number) {
        return $api.post("/signOut", {
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