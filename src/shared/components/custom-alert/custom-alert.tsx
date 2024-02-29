import { Alert, Fade } from "@mui/material";
import { Alert as AlertType } from "@src/entities/alert";
import { ReactNode } from "react";

type CustomAlert = Omit<AlertType, "type"> & {
  variant: "standard" | "filled" | "outlined" | undefined;
  severity: "success" | "info" | "warning" | "error" | undefined;
  title?: ReactNode;
};

const CustomAlert = ({
  msg,
  isOpen,
  variant,
  severity,
  title,
}: CustomAlert) => {
  return (
    <Fade in={isOpen}>
      <Alert
        variant={variant}
        style={{
          width: 400,
          position: "fixed",
          right: 50,
          top: 50,
        }}
        severity={severity}
      >
        {title}
        {msg}
      </Alert>
    </Fade>
  );
};

export default CustomAlert;
