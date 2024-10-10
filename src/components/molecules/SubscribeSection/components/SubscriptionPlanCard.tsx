"use client";
import React from "react";
import { SubscriptionPlan } from "@/types";
import { formatCurrency } from "@/helpers";
import { Badge, Button } from "@/components/atoms";
import { BulletItem } from "./bulletItem";
import { navigate } from "@/app/actions";

interface SubscriptionPlanCardProps {
  subscriptionPlan: SubscriptionPlan;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  overrideCTAClick?: () => void;
}

export const SubscriptionPlanCard = ({
  subscriptionPlan,
  isLoading,
  setIsLoading,
  overrideCTAClick,
}: SubscriptionPlanCardProps) => {
  const handleBuy = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId: subscriptionPlan.price_stripe_id }),
      });
      const { url } = await res.json();
      navigate(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full md:w-1/3 border border-white h-[100%] rounded-xl pt-4 pb-10 lg:px-8 px-4 flex flex-col gap-4">
      <div className="h-6 my-4">
        {subscriptionPlan.popular && <Badge text="POPULAR" />}
      </div>
      <h4 className="text-white text-xl font-bold">{subscriptionPlan.name}</h4>
      <div className="flex justify-start items-center gap-1">
        <p className="text-white text-6xl font-bold">
          {formatCurrency({
            number: Number(subscriptionPlan.price),
            options: { maximumFractionDigits: 0 },
          })}
        </p>
        <div className="flex flex-col justify-start items-start">
          <p className="text-gray-400 text-sm">6+ months free</p>
          <p className="text-gray-400 text-sm">billed yearly $499</p>
          <p className="text-white text-sm font-bold">per month</p>
        </div>
      </div>
      <Button
        text="SUBSCRIBE"
        onClick={overrideCTAClick ? overrideCTAClick : handleBuy}
        round="circle"
        isLoading={isLoading}
      />
      {subscriptionPlan.bullets.map((bullet) => (
        <BulletItem bullet={bullet} />
      ))}
    </div>
  );
};
