import {Dispatch, SetStateAction, useCallback, useMemo, useState} from "react";
import {
    DateCalendar,
    DayCalendarSkeleton,
    LocalizationProvider,
    PickersDay,
    PickersDayProps
} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {uiBgColor} from "@src/config/styles/baseColors.ts";
import {useBookingDate} from "@src/hooks/usetBookingDate.ts";

interface BookingCalendar {
    handleSelect: Dispatch<SetStateAction<Date | undefined>>
}

const formatDateToCalendar = (day: dayjs.Dayjs) => {
    const timeZoneAdjustedString = day.add(3, 'hour').toISOString(); // добавляем 3 часа

    console.log(timeZoneAdjustedString.split('T')[0])

    return timeZoneAdjustedString.split('T')[0];
}



function ServerDay(props: PickersDayProps<Dayjs> & {
    highlightedDays?: string[],
    onChange?: (date: string | undefined) => void
}) {
    const {highlightedDays = [], day, outsideCurrentMonth, onChange, ...other} = props;

    const isSelected =
        day && !outsideCurrentMonth && highlightedDays.includes(day?.toISOString().split('T')[0]);
    const handleClick = useCallback(
        () => {
            if (onChange) {
                onChange(formatDateToCalendar(day));
            }
        },
        [onChange, day]
    );


    return (
        <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
            onClick={handleClick}
            style={{
                color: "white",
                backgroundColor: isSelected ? 'orange' : ''
            }}
        />
    );
}

const CalendarBooking = ({handleSelect}: BookingCalendar) => {
    const {data: dates, isLoading}  = useBookingDate()

    const bookingDays = dates?.map((date) => {
        return formatDateToCalendar(dayjs(date.date_to));
    });

    const [highlightedDays] = useState(bookingDays);

    const renderDay = useMemo(() => ServerDay, [highlightedDays]);


    if(isLoading) return <p style={{
        color: "black"
    }}>Loading</p>

    return (
        <div className={"w-96 h-400"} style={{
            backgroundColor: uiBgColor,
            borderWidth: 2,
            borderRadius: 20,
            borderColor: "blue"
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    sx={{
                        color: "white"
                    }}
                    renderLoading={() => <DayCalendarSkeleton/>}
                    slots={{
                        day: renderDay,
                    }}
                    timezone={"system"}
                    slotProps={{
                        day: {
                            highlightedDays,
                            onChange: handleSelect,
                        } as any,
                    }}
                />
            </LocalizationProvider>
        </div>
    );
};

export default CalendarBooking;
