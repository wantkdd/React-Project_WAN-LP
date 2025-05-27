import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import useDebounce from '../hooks/custom/useDebounce';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import LpCard from '../components/lp-detail/lp-card';
import LpCardSkeletonList from '../components/lp-detail/lp-card-skeleton-list';
import useThrottle from '../hooks/custom/useThrottle';
import { PAGINATION_ORDER } from '../enums/commons';
import OrderButton from '../components/order-button';

const SearchPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const debouncedSearch = useDebounce(search, 500);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  });
  const throttledInView = useThrottle(inView, 1000);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteLpList(20, order, debouncedSearch);

  const prevInViewRef = useRef(false);

  useEffect(() => {
    if (
      throttledInView &&
      !prevInViewRef.current &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
      console.log('다음 페이지 호출');
      prevInViewRef.current = true; //다음 호출 방지
    } else if (!throttledInView) {
      prevInViewRef.current = false;
    }
  }, [throttledInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const lps = data?.pages.flatMap((page) => page.data.data) || [];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">LP 검색</h2>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <OrderButton order={order} setOrder={setOrder} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {debouncedSearch === '' ? (
          <div className="text-white text-lg col-span-full text-center py-10">
            검색어를 입력해주세요.
          </div>
        ) : isLoading ? (
          <LpCardSkeletonList count={20} />
        ) : lps.length === 0 ? (
          <div className="text-white text-lg col-span-full text-center py-10">
            검색 결과가 없습니다.
          </div>
        ) : (
          <>
            {lps.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
            {isFetchingNextPage && <LpCardSkeletonList count={10} />}
          </>
        )}
      </div>

      <div ref={ref} className="h-10 mt-4" />
    </div>
  );
};

export default SearchPage;
