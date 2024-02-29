import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { CardList } from "../widgets/card-list";
import { usePagination } from "@src/shared/components/pagination/model/usePagination.ts";
import { useGetEquipments } from "@src/widgets/card-list/model/card-equipment.model.ts";
import { useDebounce } from "@src/shared/hooks/useDebounce.ts";
import Panel from "@src/widgets/panel/Panel.tsx";
import CustomPagination from "@src/shared/components/pagination";
import InputSearch from "@src/shared/components/search";

const Equipments = () => {
  const [searchName, setSearchName] = useState("");
  const { setTotalItems, skip, take, totalPages, goToPage, currentPage } =
    usePagination(15);

  const debouncedValue = useDebounce(searchName, 700);

  const { data, isLoading, isSuccess } = useGetEquipments({
    debouncedValue,
    take,
    skip,
  });

  const isSuccessfulData = useMemo(
    () => (isSuccess && !isLoading ? data.data : []),
    [isSuccess, isLoading, data]
  );

  useEffect(() => {
    if (isSuccessfulData && data) {
      setTotalItems(data.count._count);
    }
  }, [isSuccessfulData, data, setTotalItems]);

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
    </div>
  );
};

export default Equipments;
