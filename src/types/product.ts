import { ObjectId } from "mongoose";

export type Bullet = {
  label: string;
  icon: boolean;
  highlight: boolean;
};

export type SubscriptionPlan = {
  name: string;
  price: string;
  description: string;
  prod_stripe_id: string;
  price_stripe_id: string;
  popular: boolean;
  bullets: Bullet[];
};

export type ProductConfig = {
  _id: ObjectId;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  title: string;
  logoLink: string;
  month_subscriptions: SubscriptionPlan[];
};
