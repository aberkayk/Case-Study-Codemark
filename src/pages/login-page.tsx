import { LoginForm } from "../components/login/login-form";

const LoginPage = () => {
  return (
    <div className="container relative h-[800px] flex-col items-center justify-center grid">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your username below to log in your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
