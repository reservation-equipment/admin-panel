import {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {Alert, AlertTitle, Fade} from "@mui/material";

export enum AlertTypes {
    IDLE = "IDLE",
    UPDATE_EQUIPMENT = "UPDATE_EQUIPMENT",
    DELETE_EQUIPMENT = "DELETE_EQUIPMENT",
    UPDATE_AREAS = "UPDATE_AREAS",
    CREATE_EQUIPMENT = "CREATE_EQUIPMENT",
    ACCESS_DENIED = "ACCESS_DENIED",
    USER_NOT_FOUND = "USER_NOT_FOUND"
}

export interface Alert {
    type: keyof typeof AlertTypes
    msg: string
    isOpen: boolean
}

const initStateAlert = (): Alert => {
    return {
        type: AlertTypes.IDLE,
        msg: "",
        isOpen: false
    }
}
const TIMER_FADE_ALERT = 3000

type AlertOutputHook = [
    Dispatch<SetStateAction<Alert>>,
    JSX.Element | null |undefined
]

export const useAlert = (): AlertOutputHook => {
    const [alert, setAlert] = useState<Alert>(initStateAlert())

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert(initStateAlert());
        }, TIMER_FADE_ALERT);

        return () => {
            clearTimeout(timeout);
        }

    }, [alert.type, alert.msg])


    const renderedAlert = useMemo(() => {

        switch (alert.type) {
            case "UPDATE_EQUIPMENT":
                return (
                    <Fade in={alert.isOpen}>
                        <Alert variant={"standard"} style={{
                            width: 400,
                            position: 'fixed',
                            right: 50,
                            top: 50
                        }} severity="success">
                            {alert.msg}
                        </Alert>
                    </Fade>
                );
            case "DELETE_EQUIPMENT":
                return (
                    <Fade in={alert.isOpen}>
                        <Alert variant={"standard"} style={{
                            width: 400,
                            position: 'fixed',
                            right: 50,
                            top: 50
                        }} severity="success">
                            {alert.msg}
                        </Alert>
                    </Fade>
                );
            case "UPDATE_AREAS":
                return (
                    <Fade in={alert.isOpen}>
                        <Alert variant={"filled"} style={{
                            width: 400,
                            position: 'fixed',
                            right: 50,
                            top: 50
                        }} severity="success">
                            {alert.msg}
                        </Alert>
                    </Fade>
                );
            case "USER_NOT_FOUND":
                return (
                    <Fade in={alert.isOpen}>
                        <Alert variant={"filled"} style={{
                            width: 400,
                            position: 'absolute',
                            right: 50,
                            top: 50
                        }} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {alert.msg}
                        </Alert>
                    </Fade>
                )
            case "ACCESS_DENIED":
                return (
                    <Fade in={alert.isOpen}>
                        <Alert variant={"filled"} style={{
                            width: 400,
                            position: 'absolute',
                            right: 50,
                            top: 50
                        }} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {alert.msg}
                        </Alert>
                    </Fade>
                )
            case "CREATE_EQUIPMENT":
                return (
                    <Fade in={alert.isOpen}>
                        <Alert variant={"filled"} style={{
                            width: 400,
                            position: 'fixed',
                            right: 50,
                            top: 50
                        }} severity="success">
                            {alert.msg}
                        </Alert>
                    </Fade>
                )
            case AlertTypes.IDLE:
                return null
        }
    }, [alert])

   return [
       setAlert,
       renderedAlert
   ]
};