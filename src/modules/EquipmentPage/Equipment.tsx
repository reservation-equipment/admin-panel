import {useLocation} from "react-router-dom";
import {YANDEX_URL_S3_IMAGE} from "../../config/YandexStorage.ts";

const Equipment = () => {
    // const { id } = useParams();
    const location = useLocation();
    const data = location.state;
    console.log(data)
    return (
        <div style={{
            color: "black"
        }}>
            {JSON.stringify(data, null, 4)}
            <img src={`${YANDEX_URL_S3_IMAGE}/${data.img_hrefs?.[0]}`} width={400} height={200}/>
        </div>
    );
};

export default Equipment;
