import {Dispatch, SetStateAction, useMemo, useState} from "react";
import UpdateCard from "../modules/Equipments/components/UpdateCard/UpdateCard.tsx";
import ModalWrapper from "../hoc/ModalWrapper.tsx";
import ModalConfirm from "../shared/components/ModalConfirm/ModalConfirm.tsx";

export enum ModalTypes {
    IDLE = "",
    UPDATE_CARD = "update_card",
    CONFIRM_MODAL = "confirm_modal"

}

export type ModalOutput = [
    renderedModal: JSX.Element | null,
    setOpen:  Dispatch<SetStateAction<boolean>>,
    setTypeModal: Dispatch<SetStateAction<ModalTypes>>,
    setProps: Dispatch<SetStateAction<any>>
]

export const useModal = (): ModalOutput => {
    const [open, setOpen] = useState<boolean>(false);
    const [typeModal, setTypeModal] = useState<ModalTypes>(ModalTypes.IDLE)
    const [props, setProps] = useState<any>({})

    const handleClose = () => setOpen(false)


    const renderedModal = useMemo(() => {
        if (open) {
            switch (typeModal) {
                case ModalTypes.UPDATE_CARD:
                    return <ModalWrapper
                        setOpen={setOpen}
                        open={open}
                        handleClose={handleClose}
                    >
                        <UpdateCard {...props} close={handleClose}/>
                    </ModalWrapper>
                case ModalTypes.CONFIRM_MODAL:
                    return <ModalWrapper
                        setOpen={setOpen}
                        open={open}
                        handleClose={handleClose}
                    >
                        <ModalConfirm {...props} handleClose={handleClose}/>
                    </ModalWrapper>
                case ModalTypes.IDLE:
                    return null
            }
        } else {
            return null
        }
    }, [open, typeModal, setOpen, props]);

    return [
        renderedModal,
        setOpen,
        setTypeModal,
        setProps
    ]
}