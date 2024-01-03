import { NextFunction, Request, Response } from 'express';
import slugify from 'slugify';

import { dev } from '../config';
import Product from '../models/productSchema';
import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from '../services/productService';
import { ProductInput } from '../types/productType';
import ApiError from '../errors/ApiError';
import { deleteImage } from '../helper/deleteImage';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const search = (req.query.search as string);
    const { products, pagination } = await getProducts(page, limit, search);
    res.status(200).send({
      message: 'All products are returned',
      payload: {
        products,
        pagination
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const product = await getSingleProduct(id);
    res.status(200).send({
      message: 'Single product is returned',
      payload: product
    });
  } catch (error) {
    next(error);
  }
};

export const createSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, description, quantity, category, sold, shipping } = req.body;
    const imagePath = req.file?.path;

    const productInput: ProductInput = {
      name,
      slug: slugify(name),
      price,
      image: imagePath || dev.app.defaultProductImage,
      description,
      quantity,
      category,
      sold,
      shipping,
    };

    const product = await createProduct(productInput);
    res.status(201).send({
      message: 'Product created successfully!',
      payload: product
    });
  } catch (error) {
    next(error);
  }
};

export const updateSingleProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const id = req.params.id;
  const imagePath = req.file?.path;

  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new ApiError(404, 'Product is not found');
  }
  
  const allowedFields = [
    'name',
    'description',
    'price',
    'category',
    'quantity',
    'shipping'
  ]
  
  const updates: Record<string, unknown> = {}
  
  for (const key in req.body) {
    if(allowedFields.includes(key)) {
      if (key === 'name') {
        updates[key]= req.body.name;
        updates.slug = slugify(req.body.name);
      } else {
        updates[key]= req.body[key];
      }
    }
  }

  if (imagePath) {
    updates.image = imagePath;
  }

  const updatedProduct = await Product.findOneAndUpdate({ _id: id }, updates, { new: true, runValidators: true, context: 'query'});

  if (!updatedProduct) {
    throw new ApiError(400, 'product data could not be updated');
  }

  if (updatedProduct && product.image && product.image !== updatedProduct.image) {
    await deleteImage(product.image);
  }

  res.status(200).json({
    message: 'Product data updated successfully!',
    payload: updatedProduct
  });
  } catch (error) {
    next(error);
  }
};

// filter part:
export const getFilteredProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, priceRangeMin, priceRangeMax } = req.query;
    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    if (priceRangeMin && priceRangeMax) {
      filter.price = { $gte: Number(priceRangeMin), $lte: Number(priceRangeMax) };
    }
    const products = await Product.find(filter);
    res.status(200).send({
      message: 'Returns filtered products',
      payload: products
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};