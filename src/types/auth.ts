import { ObjectId } from "mongoose";

export type Subscription = {
  _id: ObjectId;
  product_id: ObjectId;
  user_id: ObjectId;
  payments: ObjectId[];
  startDate: string;
  endDate: string;
};

export type User = {
  _id: ObjectId;
  email: string;
  subscriptions: Subscription[];
  payments: ObjectId[];
  canSendEmailMkt: boolean;
  status: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
};
