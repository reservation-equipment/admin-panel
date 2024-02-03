import {useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import {useNavigate,} from "react-router-dom";
import AuthService from "../../../../services/AuthService.ts";
import {LogInRequest} from "@src/shared/types/Auth.ts";
import {useContext} from "react";
import {AuthContext} from "@src/context/AuthContext.tsx";
import {UserRoles} from "@src/shared/types/User.ts";
import {rootPath} from "@src/config/menuItems.tsx";
import {AxiosError} from "axios";
import {AlertTypes, useAlert} from "@src/hooks/useAlert.tsx";


const AuthForm = () => {
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const [setAlert, renderedAlert] = useAlert()
    const navigate = useNavigate();
    const {dispatch, } = useContext(AuthContext)

    const onSubmit = async (formData: LogInRequest) => {
        try {
            const {email, password} = formData;
            const {data} = await AuthService.signIn(email, password)
            dispatch({
                type: "LOGIN",
                payload: data.user
            })
            if (data.user.role === UserRoles.USER) {
                setAlert({
                    msg: "У вас недостаточно прав",
                    isOpen: true,
                    type: AlertTypes.ACCESS_DENIED
                })
                return null
            }

            localStorage.setItem("token", data.accessToken)

            navigate(rootPath)

        } catch (e: AxiosError | Error) {
            const {response} = e;

            if (response.status === 400) {
                setAlert({
                    msg: response.data.msg,
                    type: AlertTypes.USER_NOT_FOUND,
                    isOpen: true
                })
            }
        }
    }

    return (
        <>
            <div className={"w-1/4 h-auto bg-gray-600 px-10 py-10 rounded-2xl"}>
                <form onSubmit={handleSubmit(onSubmit)} className={"flex gap-5 flex-col items-center"}>
                    <TextField id="email-input"
                               label="Email"
                               variant="filled"
                               type={"email"}
                               fullWidth
                               placeholder={"example@mail.com"}
                               {...register("email")}
                               className={"bg-white"}/>
                    <TextField id="password-input"
                               label="Password"
                               variant="filled"
                               fullWidth
                               placeholder={"********"}
                               type={"password"}
                               {...register("password")}
                               className={"bg-white"}/>
                    <Button type={"submit"} variant={"contained"} style={{
                        marginTop: 20,
                        maxWidth: 280,
                        width: "100%"
                    }}>{"Войти"}</Button>
                </form>
            </div>
            {renderedAlert}
        </>
    );
};

export default AuthForm;
