import { useBooking } from "@src/shared/hooks/useBooking.ts";
import BookingList from "@src/widgets/booking-history/BookingList.tsx";

const BookingHistory = () => {
  // const [selectDate, setSelectDate] = useState<Date | undefined>()

  const { data, isLoading } = useBooking();

  // const renderCalender = useMemo(() => {
  //     return (
  //         <CalendarBooking handleSelect={setSelectDate}/>
  //     )
  // }, [])

  if (isLoading)
    return (
      <p
        style={{
          color: "black",
        }}
      >
        Loading
      </p>
    );

  return (
    <div className={"grid grid-cols-1 gap-x-40"}>
      <BookingList data={data?.data ?? []} />
      {/*{renderCalender}*/}
    </div>
  );
};

export default BookingHistory;
