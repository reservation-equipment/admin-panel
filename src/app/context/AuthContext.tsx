import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { IUser, UserRoles } from "../../entities/user/user.ts";

const defaultAuthInit = {
  user: null,
  isAuth: false,
  isAdmin: false,
  isOwner: false,
};

type InitialStateType = {
  user: IUser | null;
  isAuth: boolean;
  isAdmin: boolean;
  isOwner: boolean;
};
type ActionAuth = {
  type: "LOGIN" | "LOGOUT";
  payload: IUser;
};

export const AuthContext = createContext<{
  state: InitialStateType | undefined;
  dispatch: Dispatch<ActionAuth>;
}>({
  state: undefined,
  dispatch: () => null,
});

const authReducer = (state: InitialStateType, action: ActionAuth) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAdmin: action.payload.role === UserRoles.ADMIN,
        isOwner: action.payload.role === UserRoles.OWNER,
        user: action.payload,
        isAuth: true,
      };
    case "LOGOUT":
      return {
        ...defaultAuthInit,
      };
    default: {
      return state;
    }
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, defaultAuthInit);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
