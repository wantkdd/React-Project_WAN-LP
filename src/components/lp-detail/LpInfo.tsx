import React from 'react';
import { LpDetailData } from '../../types/lp-detail';

interface LpInfoProps {
  lpData: LpDetailData;
  isLiked: boolean | undefined;
  onLike: () => void;
  onDislike: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const LpInfo: React.FC<LpInfoProps> = ({
  lpData,
  isLiked,
  onLike,
  onDislike,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
            {lpData.author?.avatar ? (
              <img
                src={lpData.author.avatar}
                alt={lpData.author.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              lpData.author?.name.charAt(0)
            )}
          </div>
          <span className="ml-3 text-sm text-gray-300">
            {lpData.author?.name || '익명'}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            className="p-1 text-gray-400 hover:text-white"
            onClick={onEdit}
          >
            수정
          </button>
          <button
            className="p-1 text-red-400 hover:text-red-300"
            onClick={onDelete}
          >
            삭제
          </button>
        </div>
      </div>

      <div className="text-center my-4">
        <h1 className="text-xl font-bold">{lpData.title}</h1>
        <p className="text-sm text-gray-400">
          {new Date(lpData.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex justify-center py-8">
        <div
          className={`w-64 h-64 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg animate-spin-slow cursor-pointer`}
        >
          <img
            src={lpData.thumbnail}
            alt={lpData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 bg-gray-900 rounded-full border-2 border-gray-700" />
          </div>
        </div>
      </div>

      <div className="p-6 text-center">
        <p className="text-sm text-gray-400 mb-4">{lpData.content}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {lpData.tags.length > 0 ? (
            lpData.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs"
              >
                #{tag.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">태그 없음</span>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={isLiked ? onDislike : onLike}
            className="flex items-center justify-center text-pink-500 hover:text-pink-400"
          >
            <span>♥</span>
            <span className="ml-2">{lpData.likes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpInfo;
