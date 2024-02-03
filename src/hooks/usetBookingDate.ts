import {useQuery} from "react-query";
import {fetchBookingDates} from "@src/api/Booking.ts";
import {BookingDatesList} from "@src/shared/types/Booking.ts";

export const useBookingDate = () => {
    return useQuery<BookingDatesList[], Error>({
        queryKey: ["dates_booking"],
        queryFn: fetchBookingDates
    })
}