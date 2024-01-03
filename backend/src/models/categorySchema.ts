import { Schema, model } from "mongoose";

import { categoryI } from "../types/categoryType";

const categorySchema = new Schema({
    name: {
        type : String,
        required: true,
        trim: true,
        minlenght: [2, "category name should be more than 2 characters "],
        maxlenght: [50 , "category name should be less than 50 characters"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    },
    {timestamps: true}
);

export const category = model<categoryI>('category', categorySchema);