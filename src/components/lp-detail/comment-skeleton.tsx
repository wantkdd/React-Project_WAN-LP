import React from 'react';

const CommentSkeleton: React.FC = () => (
  <div className="flex gap-3 animate-pulse py-3 border-b border-gray-800">
    <div className="h-8 w-8 rounded-full bg-gray-700" />
    <div className="flex-1">
      <div className="h-4 bg-gray-700 rounded w-24 mb-2" />
      <div className="h-3 bg-gray-700 rounded w-full mb-1" />
      <div className="h-3 bg-gray-700 rounded w-4/5" />
    </div>
  </div>
);

export default CommentSkeleton;
