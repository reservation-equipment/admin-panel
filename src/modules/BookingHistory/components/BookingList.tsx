import BookingItem from "./BookingItem.tsx";
import {useMemo} from "react";
import {TBooking} from "../../../shared/types/Booking.ts";

interface BookingList {
    data: TBooking[]
}

const BookingList = ({data}: BookingList) => {

    const renderBookingItem = useMemo(() => {
        return data.map((booking) => {
            return (
                <BookingItem key={booking.id} data={booking}/>
            )
        })
    }, [data]);

    return (
        <div>
            {
                renderBookingItem
            }
        </div>
    );
};

export default BookingList;
