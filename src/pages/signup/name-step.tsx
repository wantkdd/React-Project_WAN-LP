import { StepProps } from '../signup-page';

type NameStepProps = StepProps & {
  isSubmitting: boolean;
  prevStep: () => void;
  onSubmit: () => void;
};

const ErrorMessage = ({ message }: { message: string | undefined }) => (
  <div className="text-red-500 text-sm">{message}</div>
);

const NameStep = ({
  register,
  errors,
  watchedValues,
  isSubmitting,
  prevStep,
  onSubmit,
}: NameStepProps) => (
  <>
    <div className="mb-4">
      <p className="text-white mb-2">이메일: {watchedValues.email}</p>
      <p className="text-white mb-2">비밀번호: {watchedValues.password}</p>
    </div>
    <div className="mb-4">
      <input
        {...register('name')}
        type="text"
        id="name"
        className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
        ${errors?.name ? 'border-red-400 ' : ' border-gray-300'}`}
        placeholder="이름"
      />
      {errors?.name && <ErrorMessage message={errors.name.message} />}
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
        disabled={!watchedValues.name || !!errors.name || isSubmitting}
        type="button"
        className="w-1/2 bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
        onClick={onSubmit}
      >
        회원가입
      </button>
    </div>
  </>
);

export default NameStep;
