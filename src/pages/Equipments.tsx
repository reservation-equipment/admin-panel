import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAlert } from "@src/shared/hooks/useAlert.tsx";
import { CardList } from "../widgets/card-list";
import { usePagination } from "@src/shared/components/pagination/model/usePagination.ts";
import { useGetEquipments } from "@src/widgets/card-list/model/card-equipment.model.ts";
import { useDebounce } from "@src/shared/hooks/useDebounce.ts";
import Panel from "@src/widgets/panel/Panel.tsx";
import CustomPagination from "@src/shared/components/pagination";
import InputSearch from "@src/shared/components/search";

const Equipments = () => {
  const [setAlert, renderedAlert] = useAlert();

  const [searchName, setSearchName] = useState("");
  const { setTotalItems, skip, take, totalPages, goToPage, currentPage } =
    usePagination(15);

  const debouncedValue = useDebounce(searchName, 700);

  const { data, isLoading, isSuccess } = useGetEquipments({
    debouncedValue,
    take,
    skip,
  });

  const isSuccessfulData = isSuccess && !isLoading ? data.data : [];

  useEffect(() => {
    if (isSuccessfulData && data) {
      setTotalItems(data.count._count);
    }
  }, [isSuccessfulData]);

  const handleSearchName = useCallback(
    (value: string) => {
      setSearchName(value);
    },
    [setSearchName]
  );

  return (
    <div className="w-full pb-10">
      <Panel />
      <Box className={"flex items-center justify-between"}>
        <InputSearch
          searchValue={searchName}
          setSearchValue={handleSearchName}
        />
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={goToPage}
        />
      </Box>
      <CardList data={isSuccessfulData} />
      {renderedAlert}
    </div>
  );
};

export default Equipments;
