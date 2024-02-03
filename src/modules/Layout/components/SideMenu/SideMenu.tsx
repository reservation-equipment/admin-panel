import {menuItems} from "@src/config/menuItems.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import AuthService from "../../../../services/AuthService.ts";
import {useContext} from "react";
import {AuthContext} from "@src/context/AuthContext.tsx";

const SideMenu = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext)

    const onLogout = async () => {
        await AuthService.logOut()
        localStorage.removeItem("token")
        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
    }

    const renderMenuItems =  menuItems.map((item, ix: number) => {
            const {link, label, icon} = item;
            return <li key={ix}>
                <Link className={"text-sky-950 flex items-center"} to={link}>
                    <p className={"items-center hover:bg-gray-100 text-white dark:hover:bg-gray-700 rounded-2xl p-4 hover:text-cyan-300 flex gap-x-4"}>
                        {icon}{label}
                    </p>
                </Link>
            </li>
        })

    return (
        <div className={"w-350 h-screen bg-gray-600 px-5 py-8 flex flex-col justify-between fixed z-10"}>
            <ul className={"flex flex-col gap-y-5"}>
                {renderMenuItems}
            </ul>
            <Button onClick={onLogout} variant={"outlined"} style={{
                borderColor: "cyan",
                color: "cyan"
            }}>{"Выйти"}</Button>
        </div>
    );
};

export default SideMenu;
