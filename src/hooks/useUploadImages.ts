import $api from "../api/axios.ts";

export const useUploadImages = () => {
    return (data: any, id: number) => {
        const formData = new FormData()
        data.forEach((image: File) => {
            formData.append("image_equipment", image)
        })

        return $api.post(`/uploads?id=${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data);
            console.log(formData);
        })
    }
}