import mongoose from "mongoose";
const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    authProviderId: { type: String },
  },
  { timestamps: true }
);
export const Member =
  mongoose.models?.Member || mongoose.model("Member", MemberSchema);
