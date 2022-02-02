export type PaginateType<T> = {
  data: T;
  links: {
    current: string;
    last: string;
    next?: string;
  };
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};
