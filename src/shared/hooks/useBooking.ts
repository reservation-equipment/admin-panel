import { useQuery } from "react-query";
import { getBookings } from "@src/entities/booking";

export const useBooking = (selectDate: Date | undefined) => {
  return useQuery({
    queryKey: ["booking", selectDate],
    queryFn: () => getBookings(selectDate),
  });
};
