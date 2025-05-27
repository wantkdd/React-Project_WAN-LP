import useGetInfiniteLpList from './useGetInfiniteLpList';

export function useSearchLps(search: string) {
  return useGetInfiniteLpList(10, 'desc', search);
}
