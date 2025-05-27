import { StepProps } from '../signup-page';

type EmailStepProps = StepProps & {
  nextStep: () => void;
};
const ErrorMessage = ({ message }: { message: string | undefined }) => (
  <div className="text-red-500 text-sm">{message}</div>
);

const EmailStep = ({
  register,
  errors,
  watchedValues,
  nextStep,
}: EmailStepProps) => (
  <>
    <div className="mb-4">
      <input
        {...register('email')}
        type="email"
        name="email"
        className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
        ${errors?.email ? 'border-red-400 ' : ' border-gray-300'}`}
        placeholder={'이메일'}
        autoComplete="current-email"
      />
      {errors?.email && <ErrorMessage message={errors.email.message} />}
    </div>
    <button
      disabled={!watchedValues.email || !!errors.email}
      type="button"
      className="w-full bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
      onClick={nextStep}
    >
      다음
    </button>
  </>
);

export default EmailStep;
