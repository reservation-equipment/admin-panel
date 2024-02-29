import $api from "@src/shared/api/axios.ts";

export const useUploadImages = () => {
  return (data: any) => {
    const formData = new FormData();
    data.forEach((image: File) => {
      formData.append("image_equipment", image);
    });

    return $api
      .post(`/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };
};