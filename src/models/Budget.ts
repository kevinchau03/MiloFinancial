import mongoose, { Schema, Document } from "mongoose";

export interface BudgetDocument extends Document {
  userId: string;
  budget: {
    category: string;
    budget: number;
  }[]; // Array of categories with their budgets
}

const BudgetSchema = new Schema<BudgetDocument>(
  {
    userId: { type: String, required: true },
    budget: [
      {
        category: {
          type: String,
          required: true,
        },
        budget: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Budget =
  mongoose.models.Budget || mongoose.model<BudgetDocument>("Budget", BudgetSchema);

export default Budget;
