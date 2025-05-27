import React from 'react';

const LpCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden aspect-square relative shadow-lg animate-pulse">
      <div className="w-full h-full bg-gray-700" />

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex justify-between items-end">
          <div className="w-3/4">
            <div className="h-4 bg-gray-600 rounded w-full mb-2" />
            <div className="h-3 bg-gray-600 rounded w-1/2" />
          </div>
          <div className="bg-gray-600 h-6 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LpCardSkeleton;
