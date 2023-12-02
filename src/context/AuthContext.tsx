import {createContext, useReducer} from "react";
import {IUser, UserRoles} from "../shared/types/User.ts";


export const defaultAuthInit = {
    user: null,
    isAuth: false,
    isAdmin: false,
    isOwner: false
}

type InitialStateType = {
    user: IUser | null,
    isAuth: boolean,
    isAdmin: boolean,
    isOwner: boolean
}
export const AuthContext = createContext<{
    state: InitialStateType | undefined,
    dispatch: React.Dispatch<any>
}>({
    state: undefined,
    dispatch: () => null
})

// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state: InitialStateType, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAdmin: action.payload.role === UserRoles.ADMIN,
                isOwner: action.payload.role === UserRoles.OWNER,
                user: action.payload,
                isAuth: true,
            }
        case 'LOGOUT':
            return {
                ...defaultAuthInit
            }
        default: {
            return state
        }
    }
}

export const AuthContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(authReducer, defaultAuthInit);

    return (
        <AuthContext.Provider value={{
            state,
            dispatch
        }} >
            {children}
        </AuthContext.Provider>
    )
}