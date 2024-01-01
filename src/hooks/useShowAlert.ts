import {Dispatch, SetStateAction, useEffect, useState} from "react";

const TIMER_FADE_ALERT = 3000

type ShowAlertOutput = [boolean, Dispatch<SetStateAction<boolean>>]

export const useShowAlert = (): ShowAlertOutput => {
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {

        const timeout = setTimeout(() => {
            setShowAlert(false);
        }, TIMER_FADE_ALERT);

        return () => {
            clearTimeout(timeout);
        }

    }, [showAlert])

    return [
        showAlert,
        setShowAlert
    ]
}