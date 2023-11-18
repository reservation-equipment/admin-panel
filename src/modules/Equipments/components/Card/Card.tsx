import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useMutation, useQueryClient} from "react-query";
import {baseUrl} from "../../../../config/api.ts";

const CardEquipment = ({data, openPopup}: any) => {
    const queryClient = useQueryClient();

    const deletePost = useMutation((id) => {
        return fetch(`${baseUrl}/equipment/${id}`, {
            method: "delete",
        })
        // return axios.delete(`${baseUrl}/equipment/${id}`);
    }, {
        onSuccess: () => queryClient.invalidateQueries(['equipments'])
    });

    
    return (
        <Card sx={{ maxWidth: 345, minWidth: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        alignItems: "center"}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Описание: ${data.description}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Количество: ${data.count}` }
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
