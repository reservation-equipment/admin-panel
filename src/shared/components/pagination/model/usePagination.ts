import { useState } from "react";

export const usePagination = (itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(Math.min(Math.max(1, value), totalPages));
  };

  const skip = (currentPage - 1) * itemsPerPage;
  const take = itemsPerPage;

  return {
    setTotalItems,
    currentPage,
    totalPages,
    goToPage,
    skip,
    take,
  };
};
