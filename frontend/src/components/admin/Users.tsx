import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { banUnbanUser, deleteUser, fetchUsers, grantRole, searchUser, sortUsers } from "../../redux/slices/users/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { User } from "../../types/UserType";
import AdminFunctions from "./AdminFunctions";

import { faBan, faMagnifyingGlass, faSort, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Users = () => {

  const { users, error, searchTerm } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    if(error) {
      toast.error(error)
    }
  }, [error]);

  useEffect(() => {
  dispatch(fetchUsers());
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let searchTerm = event.target.value;
    dispatch(searchUser(searchTerm));
  };

  const searchedUsers = searchTerm ? users.filter((user) => 
  user.firstName.toLowerCase().includes(searchTerm.toLocaleLowerCase())) : users;

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortUsers(searchTerm));
  };

  const handleBanUnbanUser = async (_id: string, isBanned: boolean) => {
    const response = await dispatch(banUnbanUser({_id, isBanned: !isBanned}));
    toast.success(response.payload.message);
  };

  const handleGrantRole = async (_id: string, isAdmin: boolean) => {
    const response = await dispatch(grantRole({_id, isAdmin: !isAdmin}));
    toast.success(response.payload.message);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
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
                  <input type="text" name="searchUser" id="searchUser" placeholder="Search by user's first name" onChange={handleSearch} value={searchTerm} />
                </div>

                <div className="users-functions-sort">
                  <FontAwesomeIcon icon={faSort} size="lg" style={{color: "#7D7C7C"}} />
                  <select name="sort" id="sort" defaultValue={"none"} onChange={handleOptionChange}>
                    <option value="none" disabled hidden>Sort</option>
                    <option value="AtoZ">Name (A - Z)</option>
                    <option value="ZtoA">Name (Z - A)</option>
                    <option value="ascendingId">Id (Ascending)</option>
                    <option value="descendingId">Id (Descending)</option>
                  </select>
                </div>
            </div>
          </div>

          <div className="users">
            <table>
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Ban</th>
                  <th>Role</th>
                  <th>Delete</th>
                </tr>
                {searchedUsers.length > 0 &&
                searchedUsers.map((user: User) => {
                  const { _id, firstName, lastName, email, phone, address } = user;
                  return (
                    <tr key={_id}>
                      <td className="users-table-id">{_id}</td>
                      <td className="users-table">{firstName} {lastName}</td>
                      <td className="users-table">{email}</td>
                      <td className="users-table">{phone}</td>
                      <td className="users-table">{user.address? address : '-'}</td>
                      <td className="users-table-functions" onClick={()=>{handleBanUnbanUser(user._id, user.isBanned)}}>
                        {user.isBanned ? <FontAwesomeIcon icon={faBan} size="lg" style={{color: "#860404"}} /> : <FontAwesomeIcon icon={faBan} size="lg"  />}
                      </td>
                      <td className="users-table-functions" onClick={()=>{handleGrantRole(user._id, user.isAdmin)}}>
                        {user.isAdmin ? <p className="grant-role-admin">Admin</p> : <p className="grant-role-user">User</p>}
                      </td>
                      <td className="users-table-functions"><FontAwesomeIcon icon={faTrashCan} size="lg" onClick={()=>{handleDelete(user._id)}} /></td>
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

export default Users;