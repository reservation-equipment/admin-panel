import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import CreateCard from "../CreateCard/CreateCard.tsx";
import {uiBaseColors} from "../../../../config/styles/baseColors.ts";


const Panel = () => {
    return (
        <div className={"w-1/2 mb-10"}>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={"bg-cyan-950"}
                    style={{
                        backgroundColor: uiBaseColors,
                        color: "#fff"
                    }}
                >
                    <Typography>Добавить оборудование</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CreateCard/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Panel;
