import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../../apis/lp-detail';
import { QUERY_KEY } from '../../constants/key';
import { CommentsResponse } from '../../types/lp-detail';

export function useGetInfiniteComments(
  lpId: number,
  limit: number,
  search: string,
  order: 'desc' | 'asc'
) {
  return useInfiniteQuery<CommentsResponse>({
    queryKey: [QUERY_KEY.lps, lpId, 'comments', order, limit],
    queryFn: ({ pageParam }) =>
      getComments({
        lpId,
        cursor: pageParam,
        limit,
        order,
        search,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!lpId,
  });
}
