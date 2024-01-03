import { ICategory } from "./categoryType";

export type ProductType = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    sold?: number;
    shipping?: number;
    category: ICategory;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
  
export type ProductInput = Omit<ProductType, '_id'>;
  
export interface IProduct extends Document {
    save: any;
    name: string;
    slug: string;
    price: number;
    image?: string;
    quantity: number;
    sold?: number;
    shipping?: number;
    category: ICategory;
    description: string;
    createAt?: string;
    updatedAt?: string;
};