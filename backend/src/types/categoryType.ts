export type categoryI = {
    _id: string;
    name: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
};
  
export type CategoryInput = Omit<categoryI, '_id'>;

export interface ICategory extends Document {
    _id: string;
    name: string;
    slug: string;
};