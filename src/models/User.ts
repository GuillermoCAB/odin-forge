import mongoose from "mongoose";

interface IUser {
  email: string;
  subscriptions: mongoose.Types.ObjectId[];
  payments: mongoose.Types.ObjectId[];
  canSendEmailMkt: boolean;
  status: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true },
  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  ],
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
  canSendEmailMkt: { type: Boolean, default: false },
  status: { type: String, default: "pending" },
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
