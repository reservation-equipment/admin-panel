import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useMutation, useQueryClient} from "react-query";
import {baseUrl} from "../../../../config/api.ts";

const CardEquipment = ({data, openPopup}: any) => {
    const queryClient = useQueryClient();

    const deletePost = useMutation((id) => {
        return fetch(`${baseUrl}/equipment/${id}`, {
            method: "delete",
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries(['equipments'])
    });


    return (
        <Card sx={{
            maxWidth: 345, minWidth: 250, height: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderWidth: 2,
            borderColor: "grey",
            alignItems: "flex-start",
            boxShadow: "4px 4px 39px 0px rgba(34, 60, 80, 0.2)"
        }}>
            <CardMedia
                component="img"
                // alt="green iguana"
                height="140"
                // image="/static/images/cards/contemplative-reptile.jpg"
                style={{
                    backgroundColor: "#d0d0d0",
                    width: "100%",
                    height: 100
                }}
            />
            <CardContent>
                <Typography variant="h6" style={{
                    maxHeight: 200
                }} component="div" className={"overflow-y-hidden"}>
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Количество: ${data.count}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => openPopup(data.id)}>Редактировать</Button>
                <Button size="small" onClick={() => deletePost.mutate(data.id)}>Удалить</Button>
            </CardActions>
        </Card>
    );
};

export default CardEquipment;
