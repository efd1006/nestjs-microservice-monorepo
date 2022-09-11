export const getPaginationMeta = (
  page: number,
  limit: number,
  count: number
) => {
  return {
    currentPage: page + 1,
    itemsPerPage: limit,
    totalItems: count,
    totalPages: Math.ceil(count / limit),
  };
};
