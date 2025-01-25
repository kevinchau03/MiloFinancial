import mongoose, { Schema, model } from "mongoose";

// Interface for Finance Schema
export interface IFinance {
  _id: string;
  userId: mongoose.Types.ObjectId; // Explicitly use mongoose.Types.ObjectId
  accountBalance: number;
  expenses: number;
  income: number;
  transactions: {
    transactionId: string;
    name: string;
    amount: number;
    date: Date;
    category: string;
  }[];
}

// Define the Finance Schema
const FinanceSchema = new Schema<IFinance>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: true,
    },
    accountBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    expenses: {
      type: Number,
      required: true,
      default: 0,
    },
    income: {
      type: Number,
      required: true,
      default: 0,
    },
    transactions: [
      {
        transactionId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Finance model
const Finance = mongoose.models?.Finance || model<IFinance>("Finance", FinanceSchema);
export default Finance;
