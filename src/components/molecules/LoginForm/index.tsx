"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/atoms";
import { validateEmail } from "@/helpers";
import { AuthState } from "@/types";
import { useVisibility } from "@/hooks";
import { EMAIL_INPUT_ID } from "@/constants";

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
  const stickyEmailInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isFormHidden = useVisibility(formRef);

  useEffect(() => {
    const target = isFormHidden ? stickyEmailInputRef : emailInputRef;
    if (formError && target.current) {
      target.current.classList.remove("animate-border");
      target.current.focus();
      const timeoutId = setTimeout(() => {
        target.current?.classList.add("animate-border");
        setFormError("");
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [formError, isFormHidden]);

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
      await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      alert("Enviamos um link para seu email para fazer o login!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        ref={formRef}
        className="md:w-[350px] w-full bg-white p-4 rounded-lg"
      >
        <div className="bg-black p-4 rounded-lg">
          <input
            ref={emailInputRef}
            type="text"
            placeholder="Insira seu email..."
            value={email}
            onChange={handleEmailChange}
            className={`w-full h-[48px] animate-border outline-none rounded-lg flex-1 p-2 }`}
            autoFocus
            id={EMAIL_INPUT_ID}
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
      </form>
      {isFormHidden && (
        <form className="w-full fixed bottom-0 left-0 bg-black p-4 flex flex-row align-center justify-center gap-2 ">
          <input
            ref={stickyEmailInputRef}
            type="text"
            placeholder="Insira seu email..."
            value={email}
            onChange={handleEmailChange}
            className={`w-full h-[48px] animate-border outline-none rounded-lg flex-1 p-2 }`}
            autoFocus
            id={EMAIL_INPUT_ID}
          />

          <div className="w-1/4">
            <Button
              text="Comece a lucrar"
              onClick={handleSigninClick}
              isLoading={isLoading}
              className="rounded-lg"
              size="large"
            />
          </div>
        </form>
      )}
    </>
  );
};
