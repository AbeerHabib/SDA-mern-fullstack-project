import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { imageURL } from "../api";
import ProductFilteringSidebar from "../components/ProductFilteringSidebar";
import { addToCart } from "../redux/slices/cart/cartSlice";
import { fetchCategories } from "../redux/slices/categories/categorySlice";
import { fetchProducts, searchProduct, sortProducts } from "../redux/slices/products/productSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Product } from "../types/ProductType";

import { faMagnifyingGlass, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Shop = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, searchTerm } = useSelector((state: RootState) => state.products);
    
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [checkedCategories, setCheckedCategories] = useState<string []>([]);
  const [priceRange, setPriceRange] = useState<number []>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchProduct(searchTerm));
  };

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortProducts(searchTerm));
  };

  const filterProducts = products.filter((product) => {
    
    const searchMatch = searchTerm !== '' ? product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLocaleLowerCase()) : product
    
    const categoryMatch = checkedCategories.length > 0 ? checkedCategories.some((id) => product.category._id == String(id)) : product
    
    const priceMatch = priceRange.length > 0 ? product.price >= priceRange[0] && product.price <= priceRange[1] : product

    return searchMatch && categoryMatch && priceMatch;
  })

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  let buttonElements = [];
  for (let i = 2; i <= totalPages - 1; i++) {
    buttonElements.push(<button key={i} onClick={() => {handlePageChange(i)}} className="pagination-btn-pages">{i}</button>);
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart successfully!`)
  }

  return (
    <div className="shop-container">

      <ProductFilteringSidebar 
      checkedCategories={checkedCategories} 
      setCheckedCategories={setCheckedCategories}
      setPriceRange={setPriceRange}
      />

      <div className="shop-main-content">
        <div className="shop-main-content-div">
          
          <div className="products-functions">
            <div className="products-functions-search-n-sort">
              <div className="products-functions-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#7D7C7C"}} />
                <input type="text" name="searchProduct" id="searchProduct" placeholder="Search by product name/description" onChange={handleSearch} value={searchTerm}/>
              </div>

              <div className="products-functions-sort">
                <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                  <option value="none" disabled hidden>Sort</option>
                  <option value="AtoZ">Name (A - Z)</option>
                  <option value="ZtoA">Name (Z - A)</option>
                  <option value="lowToHigh">Price (Low - High)</option>
                  <option value="highToLow">Price (High - Low)</option>
                </select>
              </div>
            </div>

            <hr className="line"/>
          </div>
                    
          <div className="products">
            {currentProducts.length > 0 &&
              currentProducts.map((product: Product) => {
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
                        <p >{description}</p>
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

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage == 1} className="pagination-btn">&laquo;</button>
            {buttonElements}
            <button onClick={handleNextPage} disabled={currentPage == totalPages} className="pagination-btn">&raquo;</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shop;