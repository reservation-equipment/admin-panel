import BookingList from "./components/BookingList.tsx";
import {useBooking} from "@src/hooks/useBooking.ts";

const BookingHistory = () => {
    // const [selectDate, setSelectDate] = useState<Date | undefined>()

    const {data, isLoading} = useBooking()

    // const renderCalender = useMemo(() => {
    //     return (
    //         <CalendarBooking handleSelect={setSelectDate}/>
    //     )
    // }, [])

    if (isLoading) return <p style={{
        color: "black"
    }}>Loading</p>

    return (
        <div className={"grid grid-cols-1 gap-x-40"}>
            <BookingList data={data?.data ?? []}/>
            {/*{renderCalender}*/}
        </div>
    );
};

export default BookingHistory;
