import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchSingleProduct } from "../../redux/slices/products/singleProductSlice";
import { Product } from "../../types/ProductType";
import { addToCart } from "../../redux/slices/cart/cartSlice";
import { imageURL } from "../../api";
import { fetchCategories } from "../../redux/slices/categories/categorySlice";

const ProductDetails = () => {

  const { id } = useParams();

  const { product, isLoading, error } = useSelector((state: RootState) => state.singleProduct);
  const { categories } = useSelector((state: RootState) => state.categories);

  const dispatch: AppDispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchSingleProduct(String(id)));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  if (error) {
    return <div className="shop-container"><div className="msg"><p>{error}</p></div></div>
  }

  const getCategoryNameById = (categoryId: string) => {
    const category = categories.find((category) => category._id == categoryId)
    return category ? category.name : ''
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart successfully!`);
  }
  
  return (
    <div className="product-container">
      <div className="main-content">
        <div className="main-content-div">

          {product && (
            <div key={product._id} className="single-product">
              <div className="img-n-sizes">
                <img src={`${imageURL}${product.image}`} alt={product.name} />
              </div>
              
              <div className="single-product-details">
                <div className="name-n-price">
                  <h1>{product.name}</h1>
                  <p className="single-product-price">{product.price} SAR</p>
                </div>

                <div className="single-product-description">
                  <p>{product.description}</p>
                </div>
                
                <hr/>
                
                <div className="product-categories">
                  <p>Category: {' '}
                    {product.category && getCategoryNameById(String(product.category))}
                  </p>
                </div>

                <div className="single-product-btn">
                  <button onClick={()=>{handleAddToCart(product)}}>Add To Cart</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;