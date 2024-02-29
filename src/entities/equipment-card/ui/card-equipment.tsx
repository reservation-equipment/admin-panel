import { memo } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { YANDEX_URL_S3_IMAGE } from "@src/app/config/YandexStorage.ts";
import { Link } from "react-router-dom";
import { EquipmentCardModel } from "@src/entities/equipment-card/model/equipment-card.model.ts";

// type PropsCardEquipment = {
//     data: Equipment
//     openPopupUpdate: (id: number) => void
//     setShowDeleteAlert: Dispatch<SetStateAction<Alert>>
//     openModalConfirm: (cbDeleteCard: any) => void
// }

const CardEquipment = memo(
  ({ count, name, img_hrefs, id, actions }: EquipmentCardModel) => {
    const {
      edit: openPopupUpdate,
      delete: handleDelete,
      confirmDelete: openModalConfirm,
    } = actions;
    return (
      <Card
        sx={{
          maxWidth: 345,
          minWidth: 250,
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderWidth: 2,
          borderColor: "grey",
          alignItems: "flex-start",
          boxShadow: "4px 4px 39px 0px rgba(34, 60, 80, 0.2)",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={!img_hrefs ? "" : `${YANDEX_URL_S3_IMAGE}/${img_hrefs?.[0]}`}
          style={{
            backgroundColor: "#d0d0d0",
            width: "100%",
            height: 180,
          }}
        />
        <CardContent>
          <Typography
            variant="h6"
            style={{
              maxHeight: 200,
            }}
            component="div"
            className={"overflow-y-hidden"}
          >
            <Link key={id} color="inherit" to={`${id}`}>
              {name}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Количество: ${count}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => openPopupUpdate(id)}>
            Редактировать
          </Button>
          <Button size="small" onClick={() => openModalConfirm(handleDelete)}>
            Удалить
          </Button>
        </CardActions>
      </Card>
    );
  }
);

export default CardEquipment;
