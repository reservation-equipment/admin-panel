import UiCustomPagination from "@src/shared/components/pagination/ui/ui-custom-pagination.tsx";

const CustomPagination = ({
  currentPage,
  totalPages,
  goToPage,
}: {
  totalPages: number;
  currentPage: number;
  goToPage: (event: React.ChangeEvent<unknown>, value: number) => void;
}) => {
  return (
    <UiCustomPagination
      countPage={totalPages}
      page={currentPage}
      handlePagination={goToPage}
    />
  );
};

export default CustomPagination;
