import {useCallback, useEffect, useMemo, useState} from "react";
import Panel from "./components/Panel/Panel.tsx";
import CardEquipment from "./components/Card/Card.tsx";
import {Alert, Box, Fade, Modal, Pagination} from "@mui/material";
import UpdateCard from "./components/UpdateCard/UpdateCard.tsx";
import InputSearch from "../../shared/components/InputSearch/InputSearch.tsx";
import {useDebounce} from "../../hooks/useDebounce.ts";
import {usePagination} from "../../hooks/usePagination.ts";
import {useGetEquipments} from "../../hooks/useGetEquipments.ts";
import {Equipment} from "../../shared/types/Equipments.ts";
import {useShowAlert} from "../../hooks/useShowAlert.ts";

const Equipments = () => {
    const [showDeleteAlert, setShowDeleteAlert] = useShowAlert()
    const [searchName, setSearchName] = useState("")

    const debouncedValue = useDebounce(searchName, 700)

    const [page,
        setPage,
        take,
        countPage,
        setCountPage,
        handlePagination] = usePagination(1, 15)

    const {data, isLoading} = useGetEquipments({
        debouncedValue,
        take,
        page
    })

    useEffect(() => {
        setPage(1)
    }, []);


    useEffect(() => {
        const countAll = data?.count?._count ?? 0;
        if(countAll >= take) {
            setCountPage(Math.round(countAll / take))
        } else {
            setCountPage(1)
        }

    }, [debouncedValue, take, setCountPage, data]);

    const [open, setOpen] = useState(false);
    const [idSelected, setIdSelected] = useState<number | null>(null)

    const handleOpen = useCallback((id: number) => {
        setIdSelected(id)
        setOpen(true)
    }, [setIdSelected])
    const handleClose = () => setOpen(false);


    const handleSearchName = useCallback(
        (value: string) => {
            setSearchName(value)
        },
        [setSearchName],
    );

    const renderCard = useMemo(() => {
        const equipmentsData = data?.data ?? []
        if(!isLoading) {
            return equipmentsData?.map((equipment: Equipment) => {
                return <CardEquipment openPopup={handleOpen}
                                      key={equipment?.id}
                                      data={equipment}
                                      setShowDeleteAlert={setShowDeleteAlert}/>
            })
        }
    }, [data, handleOpen, isLoading]);

    if (isLoading) return <p>Загрузка...</p>
    return (
        <div className="w-full pb-10">
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
            <Box className={"flex items-center justify-between"}>
                <InputSearch searchValue={searchName} setSearchValue={handleSearchName}/>
                <Pagination page={page}
                            count={countPage}
                            color="primary"
                            onChange={handlePagination}

                />
            </Box>
            <div
                className={`
                grid 
                2xl:grid-cols-5 
                xl:grid-cols-4 
                lg:grid-cols-3 
                md:grid-cols-2 
                sm:grid-cols-1 
                grid-flow-row 
                gap-y-10
                gap-x-4`}>
                {renderCard}
            </div>
            {showDeleteAlert && <Fade in={showDeleteAlert}>
                <Alert variant={"outlined"} style={{
                    width: 400,
                    position: 'fixed',
                    right: 50,
                    top: 50
                }} severity="success">
                    Оборудование успешно удалено
                </Alert>
            </Fade>}
        </div>
    );
};

export default Equipments;
