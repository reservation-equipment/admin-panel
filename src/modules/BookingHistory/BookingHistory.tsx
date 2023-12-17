import CalendarBooking from "./components/CalendarBooking.tsx";
import BookingList from "./components/BookingList.tsx";
import {useQuery} from "react-query";
import {getBookings} from "../../api/Booking.ts";
import {useState} from "react";

const BookingHistory = () => {
    const [selectDate, setSelectDate] = useState<string | undefined>("")

    const {data, isLoading} = useQuery({
        queryKey: ["booking"],
        queryFn: () => getBookings(selectDate)
    })



    if(isLoading) return <p>Loading</p>

    return (
        <div className={"grid grid-cols-2 gap-x-40"}>
            <BookingList data={data?.data}/>
            <CalendarBooking data={data?.data} handleSelect={setSelectDate}/>
        </div>
    );
};

export default BookingHistory;
