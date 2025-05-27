import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useDeleteUser from '../hooks/mutations/user/useDeleteUser';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation();
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const { mutate: deleteUserAccount, isPending } = useDeleteUser();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteUserAccount();
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${
          open ? 'block md:hidden opacity-100' : 'hidden opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed md:static top-18 left-0 h-full w-60 bg-gray-700 text-white z-50 transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <div className="space-y-4">
            <Link
              to="/search-page"
              className={`flex items-center ${
                isActive('/search-page')
                  ? 'text-pink-500'
                  : 'text-white hover:text-pink-500'
              }`}
              onClick={onClose}
            >
              🔍 찾기
            </Link>

            <Link
              to="/my-page"
              className={`flex items-center ${
                isActive('/my-page')
                  ? 'text-pink-500'
                  : 'text-white hover:text-pink-500'
              }`}
              onClick={onClose}
            >
              👤 마이페이지
            </Link>
          </div>

          {accessToken && (
            <button
              onClick={handleDeleteClick}
              className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded"
              disabled={isPending}
            >
              {isPending ? '처리 중...' : '탈퇴하기'}
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">
              회원 탈퇴 확인
            </h3>
            <p className="text-white mb-6">정말 탈퇴하시겠습니까?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                취소
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={isPending}
              >
                {isPending ? '처리 중...' : '예, 탈퇴합니다'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
