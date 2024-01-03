import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../redux/store";
import { removeFromCart } from "../redux/slices/cart/cartSlice";
import { fetchProducts } from "../redux/slices/products/productSlice";
import { imageURL } from "../api";

const Cart = () => {

    const { cartItems } = useSelector((state: RootState) => state.cart);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
    dispatch(fetchProducts());
    }, []);

    const handleRemoveFromCart = (id: string) => {
        const item = cartItems.find((cartItem) => cartItem._id === id);
        if (item) {
          dispatch(removeFromCart(id));
          toast.success(`${item.name} removed from your cart`);
        }
      }

    const cartTotal = () => {
        let totalAmount = 0;
        cartItems.length > 0 && cartItems.map((cartItem) => {
            (totalAmount += cartItem.price)
        })
        return totalAmount;
    }

  return (
    <div className="cart-container">
        <div className="items-summary">
            <h1>You have {cartItems.length > 0 ? cartItems.length : 0} item(s) in your cart</h1>
        </div>

        <div className="cart-details">
            {cartItems.length > 0 && 
            <> 
            <div className="cart-items">
                {cartItems.map((cartItem) => {
                return (
                    <article key={cartItem._id} className="cart-item">
                        <div className="cart-item-img">
                            <img src={`${imageURL}${cartItem.image}`} alt={cartItem.name} className="" width="120"/>
                        </div>
                        <div className="cart-item-details">
                            <div className="cart-item-details-info">
                                <h2>{cartItem.name}</h2>
                                <h3>{cartItem.price} SAR</h3>
                            </div>
                            <button onClick={()=> {handleRemoveFromCart(cartItem._id)}}>X</button>
                        </div>
                    </article>
                )})}
            </div>

            <div className="cart-summary">
                <h2>Total</h2>
                
                <hr/>
                
                <div className="total-amount">
                    <h3>Sub-Total</h3>
                    <p>{cartTotal()} SAR</p>
                </div>
                
                <div className="delivery">
                    <h3>Delivery</h3>
                    <p>Free</p>
                </div>
                
                <button>Check Out</button>
            </div>
            </>
            }
        </div>
    </div>
  )
}

export default Cart;