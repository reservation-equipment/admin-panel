import {useForm} from "react-hook-form";
import {Alert, AlertTitle, Button, Fade, TextField} from "@mui/material";
import {useNavigate,} from "react-router-dom";
import AuthService from "../../../../services/AuthService.ts";
import {LogInRequest} from "../../../../shared/types/Auth.ts";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../context/AuthContext.tsx";
import {UserRoles} from "../../../../shared/types/User.ts";
import {rootPath} from "../../../../config/menuItems.tsx";

const TIMER_FADE_ALERT = 3000

const AuthForm = () => {
    const {
        register,
        handleSubmit,
    } = useForm();
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate();
    const {dispatch, state} = useContext(AuthContext)

    useEffect(() => {
        if (!state?.isAdmin && !state?.isOwner) {

            setShowAlert(true)
            const timeout = setTimeout(() => {
                setShowAlert(false);
            }, TIMER_FADE_ALERT);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [state])

    const onSubmit = async (formData: LogInRequest) => {
        const {email, password} = formData;
        const {data} = await AuthService.signIn(email, password)
        dispatch({
            type: "LOGIN",
            payload: data.user
        })
        if (data.user.role === UserRoles.USER) {
            console.log(data.user.role, "Юзер не является владельцем или админом")
            return null
        }
        localStorage.setItem("token", data.accessToken)

        navigate(rootPath)
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
            {
                (state?.isAuth) && <Fade in={showAlert}>
                    <Alert variant={"filled"} style={{
                        width: 400,
                        position: 'absolute',
                        right: 50,
                        top: 50
                    }} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        У вас недостаточно прав
                    </Alert>
                </Fade>
            }
        </>
    );
};

export default AuthForm;
