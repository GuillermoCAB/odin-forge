"use client";
import React, { useEffect, useState } from "react";
import { navigate } from "@/app/actions";
import Spinner from "@/images/spinner.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { LOCALSTORAGE_KEYS } from "@/constants/auth";

export const ConfirmLoginModule = () => {
  const token = useSearchParams()?.get("token");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmToken: token }),
      });
      const parsedRes = await res.json();
      localStorage.setItem(LOCALSTORAGE_KEYS.AUTH, JSON.stringify(parsedRes));
      navigate("/selectPlan");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!token) {
      toast.error("Token wasn't found, please try again");
      navigate("/");
      return;
    }

    handleConfirm();
  }, [token]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image src={Spinner} width={200} height={200} alt="spinner" />
    </div>
  );
};
