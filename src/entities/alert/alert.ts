import { AlertTypes } from "@src/shared/hooks/useAlert.tsx";

export interface Alert {
  type: keyof typeof AlertTypes;
  msg: string;
  isOpen: boolean;
}
