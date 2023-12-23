import {useEffect, useState} from "react";

export const usePagination = (initPage = 1, initTake = 15) => {
    const [page, setPage] = useState<number>(initPage);
    const [take, setTake] = useState(0)
    const [countPage, setCountPage] = useState(0)

    useEffect(() => {
        setTake(initTake)
    }, [initTake])
    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return [
        page,
        setPage,
        take,
        countPage,
        setCountPage,
        handlePagination
    ] as const

}