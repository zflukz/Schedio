import React from "react";
import AuthForm from "../component/Sign In";

const SigninPage: React.FC = () => {
  const handleAuthSubmit = (data: { email: string; password: string; name?: string }) => {
    console.log("Auth data:", data);
    // TODO: เรียก API login / register ตาม mode
  };


  return <AuthForm mode="signin" onSubmit={handleAuthSubmit} />;
};

export default SigninPage;
