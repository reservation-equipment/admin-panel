import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TBooking } from "@src/entities/booking/booking.ts";

interface BookingInfo {
  data: TBooking;
}

const BookingItem = ({ data }: BookingInfo) => {
  const {
    date_from,
    date_to,
    equipments: { name, description },
    status,
    users: { first_name, second_name },
  } = data;
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div
          style={{
            display: "flex",
            gap: "0 10px",
            width: "100%",
          }}
        >
          <div>{new Date(date_from).toLocaleString() + " / "}</div>
          <div>{new Date(date_to).toLocaleString()}</div>
          <div
            style={{
              marginLeft: 40,
              fontWeight: 700,
            }}
          >
            {"Название: "}
          </div>
          <div>{name}</div>

          <div
            style={{
              ...(status === "CREATED"
                ? {
                    backgroundColor: "orange",
                    padding: 2,
                    marginLeft: 80,
                  }
                : {
                    backgroundColor: "green",
                    padding: 2,
                  }),
            }}
          >
            {status === "CREATED" ? "ЗАБРОНИРОВАНО" : "СНЯТА БРОНЬ"}
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description}</Typography>
        <div
          style={{
            marginLeft: 40,
            fontWeight: 700,
          }}
        >
          {"Имя пользователя: "}
        </div>
        <div>{first_name}</div>
        <div>{second_name}</div>
      </AccordionDetails>
    </Accordion>
  );
};

export default BookingItem;
