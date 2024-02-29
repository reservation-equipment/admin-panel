import { useQuery } from "react-query";
import { fetchBookingDates } from "@src/shared/api/Booking.ts";
import { BookingDatesList } from "@src/entities/booking/booking.ts";

export const useBookingDate = () => {
  return useQuery<BookingDatesList[], Error>({
    queryKey: ["dates_booking"],
    queryFn: fetchBookingDates,
  });
};
