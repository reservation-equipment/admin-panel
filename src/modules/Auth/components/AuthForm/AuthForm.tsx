import {useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import {redirect, useNavigate,} from "react-router-dom";
import {rootPath} from "../../../../config/menuItems.tsx";

const AuthForm = () => {
    const {
        register,
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = () => {
        console.log('sdfsdf')
        navigate(rootPath) // New line

    }


    return (
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
    );
};

export default AuthForm;
