export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedData<T> {
  result: T;
  pagination: Pagination;
}
