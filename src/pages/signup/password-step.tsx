import { FiEye, FiEyeOff } from 'react-icons/fi';
import { StepProps } from '../signup-page';

type PasswordStepProps = StepProps & {
  showPassword: boolean;
  showPasswordCheck: boolean;
  togglePassword: () => void;
  togglePasswordCheck: () => void;
  nextStep: () => void;
  prevStep: () => void;
};

const ErrorMessage = ({ message }: { message: string | undefined }) => (
  <div className="text-red-500 text-sm">{message}</div>
);

const PasswordStep = ({
  register,
  errors,
  watchedValues,
  showPassword,
  showPasswordCheck,
  togglePassword,
  togglePasswordCheck,
  nextStep,
  prevStep,
}: PasswordStepProps) => (
  <>
    <div className="mb-4">
      <p className="text-white mb-2">이메일: {watchedValues.email}</p>
    </div>
    <div className="mb-4 relative">
      <input
        {...register('password')}
        type={showPassword ? 'text' : 'password'}
        id="password"
        className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] pr-10 focus:border-[#807bff] rounded-sm 
        ${errors?.password ? 'border-red-400 ' : ' border-gray-300'}`}
        placeholder="비밀번호"
        autoComplete="current-password"
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-3 top-3 text-white"
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </button>
      {errors?.password && <ErrorMessage message={errors.password.message} />}
    </div>

    <div className="mb-4 relative">
      <input
        {...register('passwordCheck')}
        type={showPasswordCheck ? 'text' : 'password'}
        id="passwordCheck"
        className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] pr-10 focus:border-[#807bff] rounded-sm 
        ${errors?.passwordCheck ? 'border-red-400 ' : ' border-gray-300'}`}
        placeholder="비밀번호 확인"
        autoComplete="current-password"
      />
      <button
        type="button"
        onClick={togglePasswordCheck}
        className="absolute right-3 top-3 text-white"
      >
        {showPasswordCheck ? <FiEyeOff /> : <FiEye />}
      </button>
      {errors?.passwordCheck && (
        <ErrorMessage message={errors.passwordCheck.message} />
      )}
    </div>

    <div className="flex gap-2">
      <button
        type="button"
        className="w-1/2 bg-gray-500 hover:bg-gray-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer"
        onClick={prevStep}
      >
        이전
      </button>
      <button
        disabled={
          !watchedValues.password ||
          !watchedValues.passwordCheck ||
          !!errors.password ||
          !!errors.passwordCheck
        }
        type="button"
        className="w-1/2 bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
        onClick={nextStep}
      >
        다음
      </button>
    </div>
  </>
);

export default PasswordStep;
