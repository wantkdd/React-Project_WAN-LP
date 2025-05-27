import React from 'react';
import { PAGINATION_ORDER } from '../enums/commons';

interface OrderButtonProps {
  order: PAGINATION_ORDER;
  setOrder: (order: PAGINATION_ORDER) => void;
}

const OrderButton: React.FC<OrderButtonProps> = ({ order, setOrder }) => {
  return (
    <div className="flex justify-end mb-6">
      <div className="bg-gray-800 rounded-lg p-1 inline-flex">
        <button
          className={`px-4 py-2 rounded-md transition-all ${
            order === 'desc'
              ? 'bg-pink-600 text-white'
              : 'bg-transparent text-gray-300 hover:text-white'
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all ${
            order === 'asc'
              ? 'bg-pink-600 text-white'
              : 'bg-transparent text-gray-300 hover:text-white'
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
        >
          오래된순
        </button>
      </div>
    </div>
  );
};

export default OrderButton;
