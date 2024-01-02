import {useCallback, useEffect, useMemo, useState} from "react";
import Panel from "./components/Panel/Panel.tsx";
import CardEquipment from "./components/Card/Card.tsx";
import {Alert, Box, Fade, Pagination} from "@mui/material";
import InputSearch from "../../shared/components/InputSearch/InputSearch.tsx";
import {useDebounce} from "../../hooks/useDebounce.ts";
import {usePagination} from "../../hooks/usePagination.ts";
import {useGetEquipments} from "../../hooks/useGetEquipments.ts";
import {Equipment} from "../../shared/types/Equipments.ts";
import {useShowAlert} from "../../hooks/useShowAlert.ts";
import {ModalTypes, useModal} from "../../hooks/useModal.tsx";

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

    const {data, isLoading, isSuccess} = useGetEquipments({
        debouncedValue,
        take,
        page
    })

    useEffect(() => {
        setPage(1)
    }, []);


    useEffect(() => {
        const countAll = data?.count?._count ?? 0;
        if (countAll >= take) {
            setCountPage(Math.round(countAll / take))
        } else {
            setCountPage(1)
        }

    }, [debouncedValue, take, setCountPage, data]);

    const [renderedModal,
        setOpen,
        setTypeModal,
        setProps] = useModal()


    // Функция для обработки вызов попапа редактирования оборудования
    const handleOpenUpdateCard = useCallback((id: number) => {
        setOpen(true)
        setTypeModal(ModalTypes.UPDATE_CARD)
        setProps((prevProps: any) => ({
            ...prevProps,
            id,
        }));
    }, [setTypeModal, setOpen, setProps])


    // Функция для обработки вызов попапа подтверждения удаления
    const handleOpenModalConfirm = useCallback(
        (cbDeleteCard: any) => {
            setOpen(true)
            setTypeModal(ModalTypes.CONFIRM_MODAL)
            setProps({
                msg: "Вы уверен, что хотите удалить оборудование?",
                actionFunc: cbDeleteCard,
            })
        },
        [setProps, setOpen, setTypeModal],
    );

    const handleSearchName = useCallback(
        (value: string) => {
            setSearchName(value)
        },
        [setSearchName],
    );

    const renderCard = useMemo(() => {
        const equipmentsData = data?.data
        if (equipmentsData && !isLoading && isSuccess) {
            return equipmentsData?.map((equipment: Equipment) => {
                return <CardEquipment openPopupUpdate={handleOpenUpdateCard}
                                      openModalConfirm={handleOpenModalConfirm}
                                      key={equipment?.id}
                                      data={equipment}
                                      setShowDeleteAlert={setShowDeleteAlert}/>
            })
        }
    }, [data, handleOpenUpdateCard, isLoading, isSuccess, setShowDeleteAlert]);

    if (isLoading) return <p>Загрузка...</p>
    return (
        <div className="w-full pb-10">
            {renderedModal}
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
