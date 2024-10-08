"use client";
import { navigate } from "@/app/actions";
import { Button, TextInput } from "@/components/atoms";
import { validateEmail } from "@/helpers";
import { AuthState } from "@/types";
import React, { useContext, useState } from "react";
import { FaRegEnvelope } from "react-icons/fa6";

interface SignupFormProps {
  onSuccess: (newState: Partial<AuthState>) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [formError, setFormError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSigninClick = async () => {
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      return setFormError("Email informado é invalido. Por favor verifique.");
    } else {
      setFormError("");
    }

    setIsLoading(true);

    try {
      await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      onSuccess({ inputEmail: email });

      navigate("/validateCode");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TextInput
        label="Email"
        placeholder="Coloque seu email"
        onChange={handleEmailChange}
        value={email}
        icon={<FaRegEnvelope />}
        error={!!formError}
        errorMessage={formError}
      />

      <div className="mt-8">
        <Button
          text="Entrar"
          onClick={handleSigninClick}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
