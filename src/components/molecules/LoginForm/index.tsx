"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/atoms";
import { validateEmail } from "@/helpers";
import { navigate } from "@/app/actions";
import { AuthState } from "@/types";

import "./styles.css";

interface LoginFormProps {
  onSuccess?: (newState: Partial<AuthState>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess = (state) => console.log("Success login, state", state),
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formError && emailInputRef.current) {
      emailInputRef.current.classList.remove("animate-border");

      // Setup to remove the class after animation ends
      const timeoutId = setTimeout(() => {
        emailInputRef.current?.classList.add("animate-border");
        setFormError("");
      }, 100); // Duration of the flash effect

      // Cleanup function to remove timeout if component unmounts early
      return () => clearTimeout(timeoutId);
    }
  }, [formError]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSigninClick = async () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setFormError("Email informado é inválido. Por favor verifique.");
      return;
    }

    setFormError("");
    setIsLoading(true);
    try {
      await fetch("/api/login", {
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
    <div className="md:w-[350px] w-full bg-white p-4 rounded-lg">
      <div className="bg-black p-4 rounded-lg">
        <input
          ref={emailInputRef}
          type="text"
          placeholder="Insira seu email..."
          value={email}
          onChange={handleEmailChange}
          className={`w-full h-[48px] animate-border outline-none rounded-lg flex-1 p-2 }`}
          autoFocus
        />

        <div className="mt-2">
          <Button
            text="Comece a lucrar"
            onClick={handleSigninClick}
            isLoading={isLoading}
            className="rounded-lg"
            size="large"
          />
        </div>
        <p className="text-center text-sm text-gray-500">
          Se já tiver conta, vamos te logar.
        </p>
      </div>
    </div>
  );
};
