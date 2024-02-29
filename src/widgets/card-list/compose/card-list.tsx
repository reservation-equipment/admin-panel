import { useCallback, useMemo } from "react";
import CardListLayout from "@src/widgets/card-list/ui/card-list-layout.tsx";
import CardEquipment from "@src/entities/equipment-card";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "@src/app/config/api.ts";
import {
  ModalTypes,
  PropsModal,
  useModal,
} from "@src/shared/hooks/useModal.tsx";
import { AlertTypes, useAlert } from "@src/shared/hooks/useAlert.tsx";
import { Equipment } from "@src/entities/equipment";

export const CardList = ({ data }: { data: Equipment[] }) => {
  const queryClient = useQueryClient();
  const [setShowDeleteAlert, renderedAlert] = useAlert();
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
        setShowDeleteAlert({
          type: AlertTypes.DELETE_EQUIPMENT,
          msg: "Оборудование успешно удалено!",
          isOpen: true,
        });
      },
    }
  );

  const handleOpenUpdateCard = useCallback(
    (id: number) => {
      setOpen(true);
      setTypeModal(ModalTypes.UPDATE_EQUIPMENT);
      setProps((prevProps: PropsModal) => ({
        ...prevProps,
        setAlert: setShowDeleteAlert,
        id,
      }));
    },
    [setTypeModal, setOpen, setProps, setShowDeleteAlert]
  );

  // Функция для обработки вызов попапа подтверждения удаления
  const handleOpenModalConfirm = useCallback(
    (cbDeleteCard: () => void) => {
      setOpen(true);
      setTypeModal(ModalTypes.CONFIRM_MODAL);
      setProps({
        msg: "Вы уверен, что хотите удалить оборудование?",
        actionFunc: cbDeleteCard,
      });
    },
    [setProps, setOpen, setTypeModal]
  );

  const handleDelete = (id: number) => {
    deletePost.mutate(id);
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
  }, [data, handleOpenUpdateCard]);
  return (
    <CardListLayout>
      {renderedModal}
      {renderCards}
      {renderedAlert}
    </CardListLayout>
  );
};
