import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { addProduct, deleteProduct, fetchProducts, searchProduct, sortProducts, updateProduct } from "../../redux/slices/products/productSlice";
import { fetchCategories } from "../../redux/slices/categories/categorySlice";

import { Product } from "../../types/ProductType";
import { Category } from "../../types/CategoryType";

import { AppDispatch, RootState } from "../../redux/store";
import AdminFunctions from "./AdminFunctions";
import { imageURL } from "../../api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons';


const Products = () => {
  const initialProductState: Product = {
    _id: '',
    name: '',
    slug: '',
    image: '',
    description: '',
    quantity: 0,
    sold: 0,
    shipping: 0,
    category: {
      _id: '',
      name: '',
      slug: ''
    },
    price: 0,
  }

  const { products, error, searchTerm } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);
  const [product, setProduct] = useState<Product>(initialProductState),
  [isUpdate, setIsUpdate] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [createProductError, setCreateProductError] = useState('');

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if(error) {
      toast.error(error)
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const getCategoryNameById = (categoryId: string) => {
    const category = categories.find((category) => category._id == categoryId)
    return category ? category.name : '';
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchProduct(searchTerm));
  };

  const searchedProducts = searchTerm ? products.filter((product) => 
  product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || 
  product.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())) : products;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortProducts(searchTerm));
  };

  const handleProductChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    if(type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      const productImg = fileInput.files?.[0];
      setProduct((product) => ({ ...product, [name]: productImg }));
    }
    else {
      setProduct({ ...product, [name]: value });
    }
    setCreateProductError('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name)
    formData.append('image', product.image as Blob)
    formData.append('description', product.description)
    formData.append('price', String(product.price))
    formData.append('category', String(product.category))
    formData.append('quantity', String(product.quantity))
    formData.append('sold', String(product.sold))
    formData.append('shipping', String(product.shipping))

    try {
      if(product.name.length < 2) {
        setCreateProductError('Product name must be at least 2 characters');
        return;
      }
      if(product.description.length < 2) {
        setCreateProductError('Product description must be at least 2 characters');
        return;
      }
      const category = getCategoryNameById(String(product.category))
      if (!category) {
        setCreateProductError('Category Id is not correct');
        return;
      }
      if(product.quantity < 1) {
        setCreateProductError('Quantity must be a positive number');
        return;
      }
      if(product.price < 1) {
        setCreateProductError('Product price must be a positive number');
        return;
      }
      if(product.sold < 0) {
        setCreateProductError('Sold must be a positive number');
        return;
      }
      if(product.shipping < 0) {
        setCreateProductError('Shipping must be a positive number');
        return;
      }
      if(!isUpdate) {
        const response = await dispatch(addProduct(formData));
        toast.success(response.payload.message);
      }
      else {
        const UpdateProductData = { ...product, _id: selectedProductId };
        const response = await dispatch(updateProduct(UpdateProductData));
        toast.success(response.payload.message);
        setIsUpdate(!isUpdate);
      }
      setProduct(initialProductState);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id: string, name: string, image: string, description: string,
    category: Category, quantity: number, price: number, sold: number, shipping: number) => {
      setSelectedProductId(id);
      setIsUpdate(!isUpdate);
      setProduct({ ...product, name, image, description, category, quantity, price, sold, shipping });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="categories-container">

      <AdminFunctions />

      <div className="main-content">
        <div className="main-content-div">

          <div className="admin-products-functions">
            <div className="admin-products-functions-searchSortCreate">
              <div className="admin-products-functions-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#7D7C7C"}} />
                <input type="text" name="searchProduct" id="searchProduct" placeholder="Search name/description" onChange={handleSearch} value={searchTerm}/>
              </div>

              <div className="admin-products-functions-sort">
                <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                  <option value="none" disabled hidden>Sort</option>
                  <option value="AtoZ">Name (A - Z)</option>
                  <option value="ZtoA">Name (Z - A)</option>
                  <option value="lowToHigh">Price (Low - High)</option>
                  <option value="highToLow">Price (High - Low)</option>
                </select>
              </div>

              <div className="create-product-form">
                <form onSubmit={handleSubmit}>
                  <input type="text" name="name" id="name" placeholder="Product Name" value={product.name} onChange={handleProductChange} required/>
                  <input type="file" name="image" id="image" accept="image/*" onChange={handleProductChange}/>
                  <textarea name="description" id="description" placeholder="Product Description" value={product.description} onChange={handleProductChange} required/>
                  <br/>
                  <br/>
                  <select name="category" id="category" value={product.category._id} onChange={handleProductChange} required>
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => {
                      return <option key={category._id} value={category._id}>{category.name}</option>
                    })}
                  </select>
                  <br/>
                  <br/>
                  <input type="text" name="quantity" id="quantity" placeholder="quantity" value={product.quantity} onChange={handleProductChange} required/>
                  <input type="text" name="price" id="price" placeholder="Price" value={product.price} onChange={handleProductChange} required/>
                  <input type="text" name="shipping" id="shipping" placeholder="shipping (0 for Free Shipping)" value={product.shipping} onChange={handleProductChange}/>
                  <br/>
                  <button className="create-product-btn">{isUpdate ? 'UPDATE' : 'CREATE'}</button>
                  <br/>
                  <div className="error-message">
                    <p>
                      {createProductError && 
                        <p>{createProductError}</p>
                      }
                    </p>
                  </div>
                </form>
                </div>
            </div>
          </div>

          <div className="users">
            <table className="products-t">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sold</th>
                  <th>Shipping</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
                {searchedProducts.length > 0 &&
                searchedProducts.map((product) => {
                  const { _id, name, image, description, category, quantity, sold, shipping, price } = product;
                  return (
                    <tr key={_id}>
                      <td className="products-table">{name}</td>
                      <td className="products-table"><img src={`${imageURL}${image}`} alt={name} className="product-img"/></td>
                      <td className="products-table-description">{description}</td>
                      <td className="products-table">
                      {category && getCategoryNameById(String(category))}
                      </td>
                      <td className="products-table-price">{price} SAR</td>
                      <td className="products-table">{quantity}</td>
                      <td className="products-table">{sold}</td>
                      <td className="products-table">{shipping == 0? 'Free' : shipping}</td>
                      <td className="products-table-btn"><button className="category-update-btn" 
                      onClick={()=> {handleUpdate(product._id, product.name, String(product.image), product.description, product.category
                      , product.quantity, product.price, product.sold, product.shipping)}}>UPDATE</button></td>
                      <td className="products-table-functions"><FontAwesomeIcon icon={faTrashCan} size="lg" onClick={()=>{handleDelete(product._id)}} /></td>
                    </tr>
                  );
                })
                }
              </tbody>
            </table>
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default Products;