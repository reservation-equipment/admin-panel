import { useQuery } from "react-query";
import { getBookings } from "@src/shared/api/Booking.ts";

export const useBooking = (selectDate: Date | undefined) => {
  return useQuery({
    queryKey: ["booking", selectDate],
    queryFn: () => getBookings(selectDate),
  });
};