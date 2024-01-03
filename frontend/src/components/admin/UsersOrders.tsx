import { ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../../redux/store";
import AdminFunctions from "./AdminFunctions";
import { Order } from "../../types/OrderType";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSort } from "@fortawesome/free-solid-svg-icons";

import { fetchOrders, searchOrder, sortOrders } from "../../redux/slices/orders/orderSlice";

const UsersOrders = () => {

  const { orders, error, searchTerm } = useSelector((state: RootState) => state.orders);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if(error) {
      toast.error(error)
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchOrder(searchTerm));
  };

  const searchedOrders = searchTerm ? orders.filter((order) => 
  order._id.toLowerCase().includes(searchTerm.toLocaleLowerCase())) : orders;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortOrders(searchTerm));
  };

  return (
    <div className="categories-container">

      <AdminFunctions />

      <div className="main-content">
        <div className="main-content-div">

          <div className="users-functions">
            <div className="users-functions-search-n-sort">
              <div className="users-functions-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#7D7C7C"}} />
                <input type="text" name="searchOrder" id="searchOrder" placeholder="Search by order Id" onChange={handleSearch} value={searchTerm} />
              </div>

              <div className="users-functions-sort">
                <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                  <option value="none" disabled hidden>Sort</option>
                  <option value="ascending">Date (Oldest - Newest)</option>
                  <option value="descending">Date (Newest - Oldest)</option>
                </select>
              </div>
            </div>            
          </div>

          <div className="orders">
            <table>
              <tbody>
                <tr>
                  <th>Order Id</th>
                  <th>Products</th>
                  <th>User/Visitor</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
                {searchedOrders.length > 0 &&
                searchedOrders.map((order) => {
                  const { _id, products, user, visitor, status, createdAt } = order as Order;
                  const date = new Date(createdAt).toLocaleString();
                  return (
                    <tr key={_id}>
                      <td className="orders-table-id">{_id}</td>
                        <td className="orders-table">
                          {products.map((orderProduct) => (
                            <span key={orderProduct.product?._id}>
                            <strong>Product: </strong>
                            {orderProduct.product?.name}, <strong>Qunatity: </strong>
                            {orderProduct.quantity}
                            <br/>
                            </span>
                            ))}
                      </td>
                      <td className="orders-table">
                        <span>
                          {user ? (
                          <>
                            <strong>User Id: </strong>
                            {user._id}
                            <br />
                            <strong>Username: </strong>
                            {user.firstName} {user.lastName}
                            <br/>
                            <strong>Email: </strong>
                            {user.email}
                            <br/>
                            <strong>Phone: </strong>
                            {user.phone}
                            <br />
                            <strong>Address: </strong>
                            {user.address}
                          </>
                          ) : (
                          <>
                            <strong>Visitor Id: </strong>
                            {visitor}
                          </>
                          )}
                        </span>
                      </td>
                      <td className="orders-table">{status}</td>
                      <td className="orders-table">{date}</td>
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
  )
}

export default UsersOrders;