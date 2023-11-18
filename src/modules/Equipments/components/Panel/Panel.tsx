import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import CreateCard from "../CreateCard/CreateCard.tsx";


const Panel = () => {
    return (
        <div className={"w-1/2 mb-10"}>
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Добавить оборудование</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CreateCard/>
                </AccordionDetails>
            </Accordion>
            {/*<Button variant={"outlined"}>{"Добавить оборудование"}</Button>*/}
        </div>
    );
};

export default Panel;
