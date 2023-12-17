import {
    DateCalendar,
    DayCalendarSkeleton,
    LocalizationProvider,
    PickersDay,
    PickersDayProps
} from "@mui/x-date-pickers";
import {TBooking} from "../../../shared/types/Booking.ts";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState} from "react";
import {Dayjs} from "dayjs";

interface BookingCalendar {
    data: TBooking[]
    handleSelect: (date: string | undefined) => void
}
function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
        !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

    return (

            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} style={{
                backgroundColor: isSelected ? 'orange' : ""
            }}/>
    );
}

const CalendarBooking = ({data, handleSelect}: BookingCalendar) => {
    const bookingDays = data.map((item) => {
        return new Date(item.date_to).getDate()
    })

    const [highlightedDays] = useState(bookingDays);



    return (
        <div className={"w-96 h-400"} style={{
            backgroundColor: "#cecece"
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    onChange={(date) => handleSelect(date?.toISOString())}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        } as any,
                    }}
                />
            </LocalizationProvider>

        </div>
    );
};

export default CalendarBooking;
