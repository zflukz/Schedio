import React from "react";
import SignIn from "../component/Sign In";

const SigninPage: React.FC = () => {
  const handleSignIn = (email: string, password: string) => {
    console.log("Email:", email, "Password:", password);
    // Add your authentication logic here
  };

  return <SignIn onSignIn={handleSignIn} />;
};

export default SigninPage;
