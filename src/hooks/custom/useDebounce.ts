import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  //value, delay 변경될 때마다 실행
  useEffect(() => {
    const handler = setTimeout(() => {
      //delay시간 이후 value를 debouncedValue로 업데이트하는 타이머 시작
      setDebouncedValue(value);
    }, delay);
    //value 변경되면 기존 타이머를 지워서 업데이트 취소
    //값이 계속 바뀔 때마다 마지막에 멈춘 값만 업데이트
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  //최종적으로 잠시 기다린 후의 값을 반환
  return debouncedValue;
}

export default useDebounce;
