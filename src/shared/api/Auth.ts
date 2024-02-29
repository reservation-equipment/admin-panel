import $api from "@src/shared/api/axios.ts";
import { AxiosResponse } from "axios";
import { LogOutResponse } from "@src/shared/types/Auth.ts";

export const signIn = async (email: string, password: string) =>
  $api
    .post("/signIn", {
      email,
      password,
    })
    .then((res) => res.data);

export const signOut = async (firstName: string,
                              secondName: string,
                              email: string,
                              password: string,
                              role_id: number) => $api.post("/signOut", {
    role_id,
    first_name: firstName,
    second_name: secondName,
    email,
    password
})

export const logOut = async (): Promise<AxiosResponse<LogOutResponse>> => $api.post<LogOutResponse>("/logOut")