import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import LpCard from '../components/lp-detail/lp-card';
import LpCardSkeletonList from '../components/lp-detail/lp-card-skeleton-list';
import useThrottle from '../hooks/custom/useThrottle';
import { PAGINATION_ORDER } from '../enums/commons';
import OrderButton from '../components/order-button';
import Error from '../components/error';
const HomePage: React.FC = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [prevInView, setPrevInView] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  });
  const throttledInView = useThrottle(inView, 1000);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useGetInfiniteLpList(20, order, '');

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  useEffect(() => {
    //inView가 false에서 true로 변할 때만 다음 페이지 호출
    if (throttledInView && !prevInView && hasNextPage && !isFetchingNextPage) {
      setPrevInView(true);
      fetchNextPage();
      console.log('다음페이지호출');
    } else if (!throttledInView) {
      setPrevInView(false);
    }
  }, [
    throttledInView,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    prevInView,
  ]);

  const allLps = data?.pages.flatMap((page) => page.data.data) || [];

  if (status === 'error') return <Error error={error} />;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <OrderButton order={order} setOrder={setOrder} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allLps.length === 0 ? (
          <div className="text-white text-lg col-span-full text-center py-10">
            LP가 없습니다.
          </div>
        ) : (
          <>
            {allLps.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}

            {isFetchingNextPage && <LpCardSkeletonList count={20} />}
          </>
        )}
      </div>
      <div ref={ref} className="h-10 mt-4"></div>
    </div>
  );
};

export default HomePage;
