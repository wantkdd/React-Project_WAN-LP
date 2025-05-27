import { useQuery } from '@tanstack/react-query';
import { PaginationDto } from '../../types/common';
import { getLpList } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';

import { ResponseLpListDto } from '../../types/lp';

function useGetLpList({
  order = 'desc',
  limit = 40,
  search = '',
}: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, order, limit, search],
    queryFn: () => getLpList({ order, limit, search }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    select: (data: ResponseLpListDto) => data.data.data,
  });
}

export default useGetLpList;
