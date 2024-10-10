import { ProductConfig } from "@/types";
import { ObjectId } from "mongoose";

export const productConfig: ProductConfig = {
  _id: "349f834f389fb4g78ga9ga39ga4gga9b349" as unknown as ObjectId,
  name: "BetSlayer",
  colors: {
    primary: "#C8102E",
    secondary: "#FFD700",
    tertiary: "#1A1A1A",
  },
  title: "BetSlayer - Master Your Bets with AI",
  logoLink: "https://img.logoipsum.com/325.svg",
  month_subscriptions: [
    {
      name: "Professional Plan",
      price: "29",
      description:
        "Ideal for casual or beginner bettors who want intelligent guidance to make more informed decisions. Receive daily analysis for selected games based on your risk aversion and betting history.",
      prod_stripe_id: "prod_QyWhO8lhLlaEB8",
      price_stripe_id: "price_1Q6ZdqICWdoDw822bJrDWTgH",
      popular: false,
      bullets: [
        {
          label: "Daily AI-driven analysis for up to 7 games",
          icon: true,
          highlight: true,
        },
        {
          label: "150 analyses per month",
          icon: true,
          highlight: true,
        },
        {
          label: "Integration with major betting sites",
          icon: true,
          highlight: true,
        },
        {
          label: "Customizable risk aversion settings",
          icon: true,
          highlight: true,
        },
        {
          label: "Basic betting history insights and AI analyses",
          icon: true,
          highlight: true,
        },
        {
          label: "Data-driven predictions using state-of-the-art models",
          icon: true,
          highlight: true,
        },
      ],
    },
    {
      name: "Premium Plan",
      price: "49",
      description:
        "Designed for more experienced bettors looking to maximize their returns with advanced insights and greater analysis.",
      prod_stripe_id: "prod_QyWhUreQEMdnDL",
      price_stripe_id: "price_1Q6ZeCICWdoDw822WvYcspw3",
      popular: true,
      bullets: [
        {
          label: "Daily AI-driven analysis for up to 15 games",
          icon: true,
          highlight: true,
        },
        {
          label: "350 analyses per month",
          icon: true,
          highlight: true,
        },
        {
          label: "All features of the Professional Plan, plus:",
          icon: false,
          highlight: true,
        },
        {
          label: "Long-term trend analysis and betting pattern recognition",
          icon: true,
          highlight: false,
        },
        {
          label:
            "Access to proprietary AI models for enhanced prediction accuracy",
          icon: true,
          highlight: false,
        },
        {
          label: "Multi-sport analysis and event coverage",
          icon: true,
          highlight: false,
        },
        {
          label: "Advanced data points for complex bet structuring",
          icon: true,
          highlight: false,
        },
      ],
    },
    {
      name: "Unlimitated Plan",
      price: "99",
      description:
        "For the advanced bettor who needs unlimited access to detailed analytics and full customization to optimize every betting opportunity.",
      prod_stripe_id: "prod_QyWiVJNw4qky05",
      price_stripe_id: "price_1Q6ZejICWdoDw822KiS1KeLK",
      popular: false,
      bullets: [
        {
          label: "Unlimited game analyses",
          icon: true,
          highlight: true,
        },
        {
          label: "All features of the Premium Plan, plus:",
          icon: false,
          highlight: true,
        },
        {
          label: "Real-time personalized betting recommendations",
          icon: true,
          highlight: false,
        },
        {
          label: "Priority support and dedicated account management",
          icon: true,
          highlight: false,
        },
        {
          label:
            "Access to exclusive AI insights and high-frequency data updates",
          icon: true,
          highlight: false,
        },
        {
          label:
            "Integration with our cutting-edge AI technologies for real-time decision making",
          icon: true,
          highlight: false,
        },
      ],
    },
  ],
};
