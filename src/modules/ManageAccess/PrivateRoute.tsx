import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";

export const PrivateRoute = ({children}: any) => {

    const {state} = useContext(AuthContext)
    const {isAdmin, isOwner} = state as any

    const isAuthenticated = isAdmin || isOwner

    if (isAuthenticated) return <>{children}</>

    return (
        <Navigate to={'/'}/>
    )

}