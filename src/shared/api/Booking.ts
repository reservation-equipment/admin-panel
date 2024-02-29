import { baseUrl } from "../../app/config/api.ts";
import $api from "@src/shared/api/axios.ts";

export const getBookings = (selectDate: Date | undefined) => {
  return $api
    .get(`${baseUrl}/bookings`, {
      params: {
        ...(selectDate
          ? {
              date_to: new Date(selectDate)?.toISOString(),
            }
          : {}),
        skip: 0,
        take: 10,
      },
    })
    .then((res) => res.data);
};

export const fetchBookingDates = () => {
  return $api.get(`${baseUrl}/booking_dates`).then((res) => res?.data?.data);
};
