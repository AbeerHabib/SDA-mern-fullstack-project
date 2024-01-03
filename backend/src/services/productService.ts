import slugify from 'slugify';
import { Request } from 'express';

import ApiError from '../errors/ApiError';
import { deleteImage } from '../helper/deleteImage';
import Product from '../models/productSchema';
import { IProduct, ProductInput } from '../types/productType';

export const getProducts = async (pageParam = 1, limitParam = 10, search = '') => {
  const totalCount = await Product.countDocuments();
  const totalPages = Math.ceil(totalCount / limitParam);
  const searchRegExp = new RegExp ('.*' + search + '.*', 'i');
  const filter = {
    $or:[
      {name: { $regex: searchRegExp }},
      {description: { $regex: searchRegExp }}
    ]
  };
  const options = {
    updatedAt: 0,
    __v: 0
  }
  if (pageParam < totalPages) {
    pageParam = totalPages;
  }
  const skip = (pageParam - 1) * limitParam;
  const products = await Product.find(filter, options).populate('category').sort({ name: 1 }).skip(skip).limit(limitParam);
  return {
    products,
    pagination : {
      totalPages,
      currentPage: pageParam,
      totalProducts: totalCount
    }
  }
};

export const getSingleProduct = async (id: string) => {
  const options = {
    updatedAt: 0,
    __v: 0,
  }
  const product = await Product.findById(id, options).populate('category');
  if (!product) {
    throw new ApiError(404, 'Product is not found');
  }
  return product;
}

export const isProductExist = async (name: string) => {
  const isProductExist = await Product.exists({ name: name });
  if (isProductExist) {
      throw new ApiError(409, "Product already exists");
  }
};

export const createProduct = async (productInput: ProductInput): Promise<IProduct> => {
  const { name, price, image, description, quantity, category, sold, shipping } = productInput;
  await isProductExist(name);
  const newProduct = new Product({
    name,
    slug: slugify(name),
    price,
    image,
    description,
    quantity,
    category,
    sold,
    shipping,
  });
  return newProduct.save();
};

export const updateProduct = async (req: Request) => {
  const id = req.params.id;
  let productData = req.body;
  const imagePath = req.file?.path;
  if (imagePath) {
    productData.image = imagePath;
  }
  if (productData.name) {
    productData.slug = slugify(productData.name);
  }
  const updatedProduct = await Product.findOneAndUpdate({ _id: id }, productData, { new: true });
  if(!updatedProduct) {
    throw new ApiError(404, 'Product is not found');
  }
  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    throw new ApiError(404, 'Product is not found');
  }
  if (product && product.image) {
    await deleteImage(product.image);
  }
};