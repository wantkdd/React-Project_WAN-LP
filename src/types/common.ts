import { PAGINATION_ORDER } from '../enums/commons';

export type CommonRespense<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};
export type CursorBasedResponse<T> = CommonRespense<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;
