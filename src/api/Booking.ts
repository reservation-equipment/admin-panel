import {baseUrl} from "../config/api.ts";

export const getBookings = (selectDate?: string | undefined) => {
    let query = `${baseUrl}/bookings`
    if(selectDate) {
        query += `?date_to=${selectDate}&skip=0&take=10`
    }
    console.log(query)
    return fetch(query).then(response => response.json())
}