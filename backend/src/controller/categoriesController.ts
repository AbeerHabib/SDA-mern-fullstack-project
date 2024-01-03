import { NextFunction, Request, Response } from "express";

import { createSingleCategory, deleteSingleCategory, findAllCategories, findSingleCategory, updateSingleCategory } from "../services/categoryService";

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string;
    const categories = await findAllCategories(search);
    res.status(200).send({
      message: 'All categories are returned',
      payload: categories
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const singleCategory = await findSingleCategory(slug);
    res.status(200).send({
      message: "Single category is returned",
      payload: singleCategory
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = req.body;
    const singleCategory = await createSingleCategory(newCategory);
    res.status(201).send({
      message: "Category created successfully!",
      payload: singleCategory
    });
  } catch (error) {
    next(error);
  }  
};

export const updateCategoryBySlug = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const updatedCategory = await updateSingleCategory(req);
    res.status(200).send({
      message: "Category data updated successfully!",
      payload: updatedCategory
    });
  } catch (error) {
    next(error);  
  }
};

export const deleteCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug;
    await deleteSingleCategory(slug);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};