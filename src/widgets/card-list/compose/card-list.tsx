import { useCallback, useMemo } from "react";
import { Equipment } from "@src/entities/equipment/Equipments.ts";
import CardListLayout from "@src/widgets/card-list/ui/card-list-layout.tsx";
import CardEquipment from "@src/entities/equipment-card";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "@src/app/config/api.ts";
import { ModalTypes, useModal } from "@src/shared/hooks/useModal.tsx";
import { useAlert } from "@src/shared/hooks/useAlert.tsx";

export const CardList = ({ data }: { data: Equipment[] }) => {
  const queryClient = useQueryClient();
  const [setAlert, renderedAlert] = useAlert();
  const [renderedModal, setOpen, setTypeModal, setProps] = useModal();

  const deletePost = useMutation<Response, unknown, number>(
    (id) => {
      return fetch(`${baseUrl}/equipment/${id}`, {
        method: "delete",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["equipments"]);
        // setShowDeleteAlert({
        //     type: AlertTypes.DELETE_EQUIPMENT,
        //     msg: "Оборудование успешно удалено!",
        //     isOpen: true
        // })
      },
    }
  );

  const handleOpenUpdateCard = useCallback(
    (id: number) => {
      setOpen(true);
      setTypeModal(ModalTypes.UPDATE_EQUIPMENT);
      setProps((prevProps: any) => ({
        ...prevProps,
        setAlert,
        id,
      }));
    },
    [setTypeModal, setOpen, setProps, setAlert]
  );

  // Функция для обработки вызов попапа подтверждения удаления
  const handleOpenModalConfirm = useCallback(
    (cbDeleteCard: any) => {
      setOpen(true);
      setTypeModal(ModalTypes.CONFIRM_MODAL);
      // setProps({
      //     id: undefined,
      //     setAlert: undefined,
      //     msg: "Вы уверен, что хотите удалить оборудование?",
      //     actionFunc: cbDeleteCard,
      // })
    },
    [setProps, setOpen, setTypeModal]
  );

  const handleDelete = () => {
    deletePost.mutate(data.id);
  };

  const renderCards = useMemo(() => {
    const equipmentsData = data;
    if (equipmentsData) {
      return equipmentsData?.map((equipment: Equipment) => {
        const { id, name, count, img_hrefs } = equipment;
        return (
          <CardEquipment
            key={id}
            id={id}
            name={name}
            count={count}
            img_hrefs={img_hrefs}
            actions={{
              edit: handleOpenUpdateCard,
              confirmDelete: handleOpenModalConfirm,
              delete: handleDelete,
            }}
          />
        );
      });
    }
  }, [
    data,
    handleOpenUpdateCard,
    // setAlert
  ]);
  return (
    <CardListLayout>
      {renderedModal}
      {renderCards}
    </CardListLayout>
  );
};
