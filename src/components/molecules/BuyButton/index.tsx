"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/atoms";
import { loadStripe } from "@stripe/stripe-js";
import { redirect } from "next/navigation";
import { navigate } from "@/app/actions";

interface BuyButtonProps {
  buttonLabel?: string;
  onSuccess?: () => void;
  onError?: () => void;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export const BuyButton = ({
  buttonLabel = "Buy",
  onSuccess,
  onError,
}: BuyButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      alert("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      alert(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const handleBuy = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId: "price_1Q6ZdqICWdoDw822bJrDWTgH" }),
      });
      const { url } = await res.json();
      navigate(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      round="circle"
      text={buttonLabel}
      onClick={handleBuy}
      isLoading={isLoading}
    />
  );
};
