import {Navigate} from "react-router-dom";

export const PrivateRoute = ({children}: any) => {

    const isAuthenticated = !!window.localStorage.getItem('token')

    if (isAuthenticated) return <>{children}</>

    return (
        <Navigate to={'/'}/>
    )

}