import React from 'react';

interface DeleteModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">LP 삭제 확인</h3>
        <p className="text-white mb-6">정말 이 LP를 삭제하시겠습니까?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
