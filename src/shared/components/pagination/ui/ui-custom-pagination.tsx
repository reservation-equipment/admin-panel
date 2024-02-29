import { Pagination } from "@mui/material";

const UiCustomPagination = ({
  countPage,
  page,
  handlePagination,
}: {
  page: number;
  countPage: number;
  handlePagination: (event: React.ChangeEvent<unknown>, value: number) => void;
}) => {
  return (
    <Pagination
      page={page}
      count={countPage}
      color="primary"
      onChange={handlePagination}
    />
  );
};

export default UiCustomPagination;
