import { useQuery } from '@tanstack/react-query';
import { getLpDetail } from '../../apis/lp-detail';
import { QUERY_KEY } from '../../constants/key';
import { LpDetailData } from '../../types/lp-detail';

export function useGetLpDetail(id: number) {
  return useQuery<LpDetailData>({
    queryKey: [QUERY_KEY.lps, id],
    queryFn: () => getLpDetail(id),
    staleTime: 1000 * 60 * 5,
  });
}
