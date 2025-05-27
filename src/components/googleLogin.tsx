import googleLogo from '../assets/googleLogo.svg';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + '/v1/auth/google/login';
  };

  return (
    <img
      src={googleLogo}
      alt="Google Login"
      className="cursor-pointer w-90 h-25 p-5 mb-5"
      onClick={handleGoogleLogin}
    />
  );
};

export default GoogleLoginButton;
