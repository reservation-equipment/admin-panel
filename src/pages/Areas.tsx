import AreasTable from "@src/widgets/area-table/AreasTable.tsx";
import CreateArea from "@src/features/create-area/CreateArea.tsx";
import { useCallback } from "react";
import { useAlert } from "@src/shared/hooks/useAlert.tsx";
import { ModalTypes, useModal } from "@src/shared/hooks/useModal.tsx";


const Areas = () => {
    const [renderedModal,
        setOpen,
        setTypeModal,
        setProps] = useModal()
    const [
        setAlert,
        renderedAlert] = useAlert()

    const handleOpen = useCallback((id: number) => {
        setOpen(true)
        setTypeModal(ModalTypes.UPDATE_AREA)
        setProps((prevProps) => ({
            ...prevProps,
            setAlert,
            id
        }))
    }, [setTypeModal, setOpen, setProps, setAlert])

    return (
        <>
            {renderedModal}
            <CreateArea/>
            <AreasTable openPopup={handleOpen}/>
            {renderedAlert}
        </>
    );
};

export default Areas;
