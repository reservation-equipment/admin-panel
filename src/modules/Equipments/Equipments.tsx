import React, {useCallback, useMemo, useState} from "react";
import Panel from "./components/Panel/Panel.tsx";
import CardEquipment from "./components/Card/Card.tsx";
import {useQuery} from "react-query";
import {baseUrl} from "../../config/api.ts";
import {Box, Modal, Typography} from "@mui/material";
import CreateCard from "./components/CreateCard/CreateCard.tsx";
import UpdateCard from "./components/UpdateCard/UpdateCard.tsx";

const Equipments = () => {
    const [open, setOpen] = useState(false);
    const [idSelected, setIdSelected] = useState<number | null>(null)
    const handleOpen = useCallback((id: number) => {
        setIdSelected(id)
        setOpen(true)
    }, [setIdSelected])
    const handleClose = () => setOpen(false);
    const {data, loading} = useQuery({
        queryKey: ["equipments"], queryFn: () => fetch(`${baseUrl}/equipments`).then(res => res.json())
    })

    const renderCard = useMemo(() => {
        return data?.data?.map((equipment: any) => {
            return <CardEquipment openPopup={handleOpen} key={equipment.id} data={equipment}/>
        })

    }, [data]);

    if(loading) return <p>Загрузка...</p>
    return (
        <div className="w-full">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    color: "black"
                }}>
                   <UpdateCard id={idSelected} close={handleClose}/>
                </Box>
            </Modal>
            <Panel/>
            <div className={"grid  2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-flow-row gap-4"}>
                {renderCard}
            </div>
        </div>
    );
};

export default Equipments;
