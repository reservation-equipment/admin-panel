import { baseUrl } from "@src/app/config/api.ts";
import $api from "@src/shared/api";

export type TBooking = {
  id: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
  status: "CREATED" | "COMPLETE";
  user_id: number;
  equipment_id: number;
  equipments: {
    id: number;
    area_id: number;
    name: string;
    description: string;
    count: number;
    status: "FREE" | "BOOKED";
  };
  users: {
    id: 16;
    roles: {
      id: number;
      role: "USER" | "ADMIN" | "OWNER";
    };
    first_name: string;
    second_name: string;
    mail: string;
  };
};

export type BookingDatesList = {
  date_to: string;
};

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
