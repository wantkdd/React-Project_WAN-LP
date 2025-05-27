import { z } from 'zod';
import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSignup } from '../apis/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupSchema } from '../utils/validate';
import EmailStep from './signup/email-step';
import PasswordStep from './signup/password-step';
import NameStep from './signup/name-step';

export type FormFields = z.infer<typeof signupSchema>;

export type StepProps = {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  watchedValues: FormFields;
};

const SignupPage = () => {
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const togglePasswordCheck = () => setShowPasswordCheck((prev) => !prev);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const watchedValues = watch();

  const stepValidationFields = {
    1: ['email'] as const,
    2: ['password', 'passwordCheck'] as const,
    3: ['name'] as const,
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await postSignup(data);
      if (response) {
        navigate('/login-page');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate =
      stepValidationFields[step as keyof typeof stepValidationFields];
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };
  const prevStep = () => {
    setStep((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <div className="p-6 rounded w-96">
        <form>
          {step === 1 && (
            <EmailStep
              register={register}
              errors={errors}
              watchedValues={watchedValues}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <PasswordStep
              register={register}
              errors={errors}
              watchedValues={watchedValues}
              showPassword={showPassword}
              showPasswordCheck={showPasswordCheck}
              togglePassword={togglePassword}
              togglePasswordCheck={togglePasswordCheck}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <NameStep
              register={register}
              errors={errors}
              watchedValues={watchedValues}
              isSubmitting={isSubmitting}
              prevStep={prevStep}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
