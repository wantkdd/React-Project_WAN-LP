import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface ErrorProps {
  error: unknown;
}

const Error = ({ error }: ErrorProps) => {
  const navigate = useNavigate();

  let errorMessage = '알 수 없는 오류가 발생했습니다.';

  if (error instanceof AxiosError) {
    errorMessage =
      error.response?.data?.message ??
      error.message ??
      '서버 요청 중 오류가 발생했습니다.';
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    errorMessage = (error as { message: string }).message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-300 text-gray-800">
      <div className="text-6xl">⚠️</div>
      <h1 className="text-2xl font-bold mt-4">초비상!!!!! 문제 발생 !!!!</h1>
      <p className="text-md text-gray-600 mt-2">{errorMessage}</p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-lime-600 transition cursor-pointer"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default Error;
