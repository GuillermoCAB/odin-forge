"use client";
import { navigate, removeAuthCookie, setAuthCookie } from "@/app/actions";
import { InvisibleButton } from "@/components/atoms";
import React, { useState } from "react";

interface LogoutButtonProps {
  onSuccess: () => void;
  inputEmail: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onSuccess,
  inputEmail,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      removeAuthCookie();

      onSuccess();

      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InvisibleButton
      text="Logout"
      onClick={handleLogout}
      isLoading={isLoading}
    />
  );
};
