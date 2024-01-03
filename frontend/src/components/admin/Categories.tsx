import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../../redux/store";
import { addCategory, deleteCategory, updateCategory, searchCategory, sortCategories, fetchCategories } from "../../redux/slices/categories/categorySlice";
import AdminFunctions from "./AdminFunctions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMagnifyingGlass, faSort } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {

  const { categories, error, searchTerm } = useSelector((state: RootState) => state.categories);
  const [categoryName, setCategoryName] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");
  const [createCategoryError, setCreateCategoryError] = useState("");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if(error) {
      toast.error(error)
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchCategory(searchTerm));
  };

  const searchedCategories = searchTerm ? categories.filter((category) => 
  category.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) : categories;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortCategories(searchTerm));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
    setCreateCategoryError("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if(categoryName.length < 2) {
        setCreateCategoryError('Category name must be at least 2 characters');
        return;
      }
      if(!isUpdate) {
        const response = await dispatch(addCategory(categoryName)); 
        toast.success(response.payload.message);     
      }
      else {
        const UpdateCategoryData = { slug: selectedCategorySlug, name: categoryName }
        const response = await dispatch(updateCategory(UpdateCategoryData));
        toast.success(response.payload.message);     
        setIsUpdate(!isUpdate);
      }
      setCategoryName('');
      dispatch(fetchCategories());
    }
    catch(error) {
      console.log(error);
    }
  };

  const handleUpdate = (slug: string, name: string) => {
    setSelectedCategorySlug(slug);
    setIsUpdate(!isUpdate);
    setCategoryName(name);
  };

  const handleDelete = (slug: string) => {
    dispatch(deleteCategory(slug));
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
                <input type="text" name="searchCategory" id="searchCategory" placeholder="Search by category name" onChange={handleSearch} value={searchTerm}/>
              </div>

              <div className="admin-products-functions-sort">
                <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                  <option value="none" disabled hidden>Sort</option>
                  <option value="AtoZ">Name (A - Z)</option>
                  <option value="ZtoA">Name (Z - A)</option>
                </select>
              </div>

              <div className="admin-products-functions-create">
                <form onSubmit={handleSubmit}>
                  <input type="text" name="Category" id="Category" placeholder="Enter category name" value={categoryName} onChange={handleCategoryChange} required/>
                  <button className="">{isUpdate ? 'UPDATE' : 'CREATE'}</button>
                  <div className="error-message">
                    <p>
                      {createCategoryError && 
                        <p>{createCategoryError}</p>
                      }
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="users">
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
                {searchedCategories.length > 0 &&
                  searchedCategories.map((category) => {
                    const { name, slug } = category;
                    return (
                      <tr key={slug}>
                      <td className="categories-table">{name}</td>
                      <td className="categories-table-btn"><button className="category-update-btn" onClick={()=> {handleUpdate(category.slug, category.name)}}>UPDATE</button></td>
                      <td className="categories-table-functions"><FontAwesomeIcon icon={faTrashCan} size="lg" onClick={()=>{handleDelete(category.slug)}} /></td>
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

export default Categories;