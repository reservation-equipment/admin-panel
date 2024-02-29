import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { AlertTitle } from "@mui/material";
import { Alert as AlertType } from "@src/entities/alert";
import CustomAlert from "@src/shared/components/custom-alert";

export enum AlertTypes {
  IDLE = "IDLE",
  UPDATE_EQUIPMENT = "UPDATE_EQUIPMENT",
  DELETE_EQUIPMENT = "DELETE_EQUIPMENT",
  UPDATE_AREAS = "UPDATE_AREAS",
  CREATE_EQUIPMENT = "CREATE_EQUIPMENT",
  ACCESS_DENIED = "ACCESS_DENIED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
}

const initStateAlert = (): AlertType => {
  return {
    type: AlertTypes.IDLE,
    msg: "",
    isOpen: false,
  };
};
const TIMER_FADE_ALERT = 3000;

type AlertOutputHook = [
  Dispatch<SetStateAction<AlertType>>,
  JSX.Element | null | undefined
];

export const useAlert = (): AlertOutputHook => {
  const [alert, setAlert] = useState<AlertType>(initStateAlert());

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(initStateAlert());
    }, TIMER_FADE_ALERT);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert.type, alert.msg]);

  const renderedAlert = useMemo(() => {
    const { isOpen, msg, type } = alert;
    switch (type) {
      case "UPDATE_EQUIPMENT":
        return (
          <CustomAlert
            msg={msg}
            isOpen={isOpen}
            severity={"success"}
            variant={"standard"}
          />
        );
      case "DELETE_EQUIPMENT":
        return (
          <CustomAlert
            msg={msg}
            isOpen={isOpen}
            severity={"success"}
            variant={"standard"}
          />
        );
      case "UPDATE_AREAS":
        return (
          <CustomAlert
            msg={msg}
            isOpen={isOpen}
            variant={"filled"}
            severity={"success"}
          />
        );
      case "USER_NOT_FOUND":
        return (
          <CustomAlert
            msg={msg}
            isOpen={isOpen}
            variant={"filled"}
            severity={"error"}
            title={<AlertTitle>Error</AlertTitle>}
          />
        );
      case "ACCESS_DENIED":
        return (
          <CustomAlert
            msg={msg}
            isOpen={isOpen}
            variant={"filled"}
            severity={"error"}
            title={<AlertTitle>Error</AlertTitle>}
          />
        );
      case "CREATE_EQUIPMENT":
        return (
          <CustomAlert
            msg={msg}
            isOpen={isOpen}
            variant={"filled"}
            severity={"success"}
          />
        );
      case AlertTypes.IDLE:
        return null;
    }
  }, [alert]);

  return [setAlert, renderedAlert];
};
