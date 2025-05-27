import React from 'react';
import LpCardSkeleton from './lp-card-skeleton';

interface LpCardSkeletonListProps {
  count: number;
}

const LpCardSkeletonList: React.FC<LpCardSkeletonListProps> = ({ count }) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx: number) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;
