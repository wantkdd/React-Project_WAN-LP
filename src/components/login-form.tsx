import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, SigninFormFields } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { useLogin } from '../hooks/mutations/user/useLogin';
const LoginForm = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SigninFormFields>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutateAsync: login } = useLogin();
  const onSubmit = async (data: SigninFormFields) => {
    try {
      await login(data);
      navigate('/my-page');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="p-6 rounded shadow-md w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      <EmailInput register={register} error={errors.email} />
      <PasswordInput register={register} error={errors.password} />
      <SubmitButton isDisabled={!isDirty || !isValid} />
    </form>
  );
};

interface EmailInputProps {
  register: ReturnType<typeof useForm<SigninFormFields>>['register'];
  error?: {
    message?: string;
  };
}

const EmailInput = ({ register, error }: EmailInputProps) => {
  return (
    <div className="mb-4">
      <input
        {...register('email')}
        type="email"
        className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
          ${error ? 'border-red-400' : 'border-gray-300'}`}
        placeholder="이메일"
        autoComplete="current-email"
      />
      {error && (
        <div className="text-red-500 text-sm mt-1">{error.message}</div>
      )}
    </div>
  );
};

interface PasswordInputProps {
  register: ReturnType<typeof useForm<SigninFormFields>>['register'];
  error?: {
    message?: string;
  };
}

const PasswordInput = ({ register, error }: PasswordInputProps) => {
  return (
    <div className="mb-4">
      <input
        {...register('password')}
        type="password"
        className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
          ${error ? 'border-red-400' : 'border-gray-300'}`}
        placeholder="비밀번호"
        autoComplete="current-password"
      />
      {error && (
        <div className="text-red-500 text-sm mt-1">{error.message}</div>
      )}
    </div>
  );
};

interface SubmitButtonProps {
  isDisabled: boolean;
}

const SubmitButton = ({ isDisabled }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
      disabled={isDisabled}
    >
      로그인
    </button>
  );
};

export default LoginForm;
