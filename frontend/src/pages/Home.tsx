import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../redux/store";
import { fetchProducts } from "../redux/slices/products/productSlice";
import { addToCart } from "../redux/slices/cart/cartSlice";
import { Product } from "../types/ProductType";
import { imageURL } from "../api";

const Home = () => {

  document.title = "ElecWorld Shop";

  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const latestProducts = products.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
  const iphone14 = products.find((product) => product.name === 'Iphone 14');

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart successfully!`)
  }

  return (
    <div className="container">

      <div className="banner">
        <img src="/public/images/banner.png" alt="banner"/>

        <div className="banner-text">
          <h1>One stop marketplace for all your tech needs</h1>
          <Link to="/shop">
            <button>SHOP NOW</button>
          </Link>
        </div>
      </div>

      <div className="new-products">
                <h3>Recently Added</h3>
                
        <div className="products">
          {latestProducts.length > 0 &&
            latestProducts.map((product: Product) => {
            const { _id, name, image, description, price } = product;
            return (
            <div key={_id} className="product">
              <Link to={`/shop/product/${_id}`}>
                <img src={`${imageURL}${image}`} alt={name} className="user-product-img"/>
              </Link>
              <div className='product-details'>
                <div className="product-details-name-n-price">
                  <p className="product-name">{name}</p>
                  <p className="product-price"><b>{price} SAR</b></p>
                </div>
                <div className="product-desc">
                  <p>{description}</p>
                </div>
                <div className="user-product-settings">
                  <button onClick={()=>{handleAddToCart(product)}}>Add To Cart</button>
                </div>
              </div>
            </div>
            );
            })
          }
        </div>
      </div>

      <div className="giphy-container">
        <div className="solid">
          <h3>Experience the Future Today</h3>
          <Link to={`/shop/product/${iphone14?._id}`}>
            <button>Descover Now</button>
          </Link>
        </div>
        <div className="giphy">
          <img src="/public/images/giphyimage.gif"/>
        </div>
      </div>

      <div className="additional-features-section">
        
        <div className="additional-feature-div">
          <div className="additional-feature-div-img-shipping">
              <img src="public/images/free-shipping.png" alt="" width="40"/>
          </div>
          
          <div className="additional-feature-div-description">
            <h3>Free Shipping</h3>
            <p>Free shipping on order</p>
          </div>
        </div>

        <div className="additional-feature-div">
          <div className="additional-feature-div-img-support">
            <img src="public/images/support.png" alt="" width="40"/>
          </div>
              
          <div className="additional-feature-div-description">
            <h3>Support 24/7</h3>
            <p>Contact us 24 hrs a day</p>
          </div>
        </div>

        <div className="additional-feature-div">
          <div className="additional-feature-div-img-payment">
            <img src="public/images/security.png" alt="" width="40"/>
          </div>
              
          <div className="additional-feature-div-description">
            <h3>Payment Secure</h3>
            <p>Guaranteeing a secure payment process</p>
          </div>
        </div>
      </div>

      <div className="newsletter">
        <h3>Subscribe to Newsletter</h3>
        <div className="newsletter-container">
          <p>
          Stay connected with the latest electronics trends, exclusive deals, and exciting updates. 
          Join our community to receive tech tips, product recommendations, 
          and seasonal inspirations. Sign up today and let the world of electronics come alive in your inbox!
          </p>            
          <form>
            <input type="text" name="email" id="email" placeholder="Enter a valid email"/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Home;