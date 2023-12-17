import {useCallback, useMemo, useState} from "react";
import Panel from "./components/Panel/Panel.tsx";
import CardEquipment from "./components/Card/Card.tsx";
import {useQuery} from "react-query";
import {baseUrl} from "../../config/api.ts";
import {Box, Modal} from "@mui/material";
import UpdateCard from "./components/UpdateCard/UpdateCard.tsx";
import InputSearch from "../../shared/components/InputSearch/InputSearch.tsx";
import {useDebounce} from "../../hooks/useDebounce.ts";

const Equipments = () => {
    const [searchName, setSearchName] = useState("")
    const debouncedValue = useDebounce(searchName, 700)

    const [open, setOpen] = useState(false);
    const [idSelected, setIdSelected] = useState<number | null>(null)
    const handleOpen = useCallback((id: number) => {
        setIdSelected(id)
        setOpen(true)
    }, [setIdSelected])
    const handleClose = () => setOpen(false);

    const {data, isLoading} = useQuery({
        queryKey: ["equipments", debouncedValue], queryFn: () => fetch(`${baseUrl}/equipments?name=${debouncedValue}`).then(res => res.json())
    })

    const handleSearchName = useCallback(
        (value: string) => {
            setSearchName(value)
        },
        [setSearchName],
    );


    const renderCard = useMemo(() => {
        return data?.data?.map((equipment: any) => {
            return <CardEquipment openPopup={handleOpen} key={equipment.id} data={equipment}/>
        })
    }, [data, handleOpen]);

    if (isLoading) return <p>Загрузка...</p>
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
            <InputSearch searchValue={searchName} setSearchValue={handleSearchName}/>
            <div
                className={`
                grid 
                2xl:grid-cols-5 
                xl:grid-cols-4 
                lg:grid-cols-3 
                md:grid-cols-2 
                sm:grid-cols-1 
                grid-flow-row 
                gap-y-10`}>
                {renderCard}
            </div>
        </div>
    );
};

export default Equipments;
