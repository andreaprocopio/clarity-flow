import React from "react";
import { SignInButton } from "@clerk/nextjs";

const CustomSignInButton = () => {
  return (
    <SignInButton>
      <button>Sign in</button>
    </SignInButton>
  );
};

export default CustomSignInButton;
