import { Request } from "express";
import slugify from "slugify";

import ApiError from "../errors/ApiError";
import { category } from "../models/categorySchema";
import { CategoryInput } from "../types/categoryType";

export const findAllCategories = async (search='') => {
  const searchRegExp = new RegExp ('.*' + search + '.*','i');
  const filter = {
    $or:[
      {name: {$regex:searchRegExp }}
    ]   
  }
  const options = {
    updatedAt: 0,
    __v: 0
  }
  const categories = await category.find(filter, options).sort({ name: 1 });
  if (!categories) {
    throw new ApiError(404, 'Categories are not found');
  }
  return categories;
};

export const findSingleCategory = async (slug: string) => {
  const options = {
    updatedAt: 0,
    __v: 0
  }
  const singleCategory = await category.findOne({ slug: slug }, options);
  if (!singleCategory) {
    throw new ApiError(404, 'Category is not found');
  }
  return singleCategory;
};

export const isCategoryExist = async (name: string) => {
  const isCategoryExist = await category.exists({ name: name });
  if (isCategoryExist) {
    throw new ApiError(409, "Category already exists");
  }
};

export const createSingleCategory = async (categoryInput: CategoryInput) => {
  await isCategoryExist(categoryInput.name);
  categoryInput.slug = slugify(categoryInput.name, { lower: true });
  const newCategory = new category(categoryInput);
  await newCategory.save();
  return newCategory;
};

export const updateSingleCategory = async (req: Request) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const updatedCategory = await category.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true});
  if(!updatedCategory) {
    throw new ApiError(404, 'Category is not found');
  }
  return updatedCategory;
};

export const deleteSingleCategory = async (slug: string) => {
  const deletedCategory = await category.findOneAndDelete({ slug: slug });
  if (!deletedCategory) {
    throw new ApiError(404, 'Category is not found');
  }
  return deletedCategory;
};