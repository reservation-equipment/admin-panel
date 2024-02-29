import { Dispatch, SetStateAction, useMemo, useState } from "react";
import UpdateCard from "@src/features/update-equipment/UpdateCard.tsx";
import ModalWrapper from "@src/shared/hoc/ModalWrapper.tsx";
import UpdateArea from "@src/features/update-area/UpdateArea.tsx";
import ModalConfirm from "@src/shared/components/ModalConfirm";
import { Alert } from "@src/entities/alert";

export interface PropsModal {
  msg?: string;
  id: number | null;
  setAlert: Dispatch<SetStateAction<Alert>>;
  actionFunc?: () => void;
}

export enum ModalTypes {
  IDLE = "",
  UPDATE_EQUIPMENT = "update_equipment",
  CONFIRM_MODAL = "confirm_modal",
  UPDATE_AREA = "update_area",
}

export type ModalOutput = [
  renderedModal: JSX.Element | null,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setTypeModal: Dispatch<SetStateAction<ModalTypes>>,
  setProps: Dispatch<SetStateAction<PropsModal>>
];

export const useModal = (): ModalOutput => {
  const [open, setOpen] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<ModalTypes>(ModalTypes.IDLE);
  const [props, setProps] = useState<PropsModal>({
    msg: "",
    setAlert: () => {},
    id: null,
    actionFunc: () => {},
  });

  const handleClose = () => setOpen(false);
  const renderPopup = (typeModal: ModalTypes) => {
    switch (typeModal) {
      case ModalTypes.UPDATE_EQUIPMENT:
        return (
          <UpdateCard
            id={props.id}
            setAlert={props.setAlert}
            close={handleClose}
          />
        );
      case ModalTypes.UPDATE_AREA:
        return <UpdateArea {...props} close={handleClose} />;
      case ModalTypes.CONFIRM_MODAL:
        return (
          <ModalConfirm
            actionFunc={props.actionFunc as () => void}
            msg={props.msg as string}
            handleClose={handleClose}
          />
        );
      case ModalTypes.IDLE:
        return null;
    }
  };

  const renderedModal = useMemo(() => {
    if (open) {
      return (
        <ModalWrapper setOpen={setOpen} open={open} handleClose={handleClose}>
          {renderPopup(typeModal)}
        </ModalWrapper>
      );
    } else {
      return null;
    }
  }, [open, typeModal, setOpen, props]);

  return [renderedModal, setOpen, setTypeModal, setProps];
};
