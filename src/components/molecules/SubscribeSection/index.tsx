"use client";
import React, { useState } from "react";
import { productConfig } from "@/constants/product";
import { SubscriptionPlanCard } from "./components/SubscriptionPlanCard";
import { EMAIL_INPUT_ID } from "@/constants";
import { focusElementById } from "@/helpers";

interface SubscribeSectionProps {
  overrideCTAClick?: boolean;
}

export const SubscribeSection = ({
  overrideCTAClick,
}: SubscribeSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleBuyClickOverride = () => {
    focusElementById({
      elementId: EMAIL_INPUT_ID,
      smoothScroll: true,
      offset: -100,
      duration: 700,
    });
  };

  return (
    <div className="w-full min-h-[100vh] bg-slate-950 flex justify-center">
      <div className="w-full max-w-[1200px] bg-slate-950 flex flex-col justify-center items-center px-8 py-12">
        <h3 className="text-white text-5xl font-bold mb-16">Plans & pricing</h3>
        <div className="h-[auto] w-full flex flex-col md:flex-row justify-center items-start gap-8">
          {productConfig.month_subscriptions.map((subscriptionPlan) => (
            <SubscriptionPlanCard
              subscriptionPlan={subscriptionPlan}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              overrideCTAClick={
                overrideCTAClick ? handleBuyClickOverride : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
