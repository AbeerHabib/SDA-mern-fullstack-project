import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../../redux/store";
import { logout, updateUser } from "../../redux/slices/users/userSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const { userData } = useSelector((state: RootState) => state.users);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    address: userData?.address || ''
  });

  const password = userData?.password?.substring(0, 20);
  const hashPassword = password?.replace(/./g, '•');

  const [errorText, setError] = useState("");


  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  }

  const handleLogout = () => {
    dispatch(logout());
  }
  
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {...prevUser, [name]: value }
    });
    setError("");
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {

      if(user.firstName.length < 2) {
        setError('First name must be at least 2 characters');
        return;   
      }
      if(user.lastName.length < 2) {
        setError('Last name must be at least 2 characters');
        return;   
      }
      const nameTestCondition = /[^a-zA-Z]/;
      if(nameTestCondition.test(user.firstName)) {
        setError('First name cannot contain symbols or numbers');
        return;
      }
      if(nameTestCondition.test(user.lastName)) {
        setError('Last name cannot contain symbols or numbers');
        return;
      }
      if(user.address.length < 3) {
        setError('Address must be at least 3 characters');
        return;   
      }

      const updateUserData = { _id: userData?._id, ...user };
      const response = await dispatch(updateUser(updateUserData));
      toast.success(response.payload.message);     
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-main-content">
        {userData && (
        <div className="profile">

          <div className="profile-img-n-title">
              <img src="/public/images/user.png" alt="" width="90"/>
              <h1>{`${userData?.firstName} ${userData?.lastName}`}</h1>
          </div>

          <div className="profile-data">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Password:</strong> {hashPassword}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Address:</strong> {userData.address ? userData.address : <span style={{ color: 'red' }}>Please provide your address</span>}</p>
          </div>
          <button className="edit-profile-data" onClick={handleFormOpen}>Edit Profile</button>

          <div className="user-profile-form">
            {isFormOpen && (
            <form onSubmit={handleSubmit}>
              <input type="text" name="firstName" placeholder="First name" value={user.firstName} onChange={handleChange} required/>
              <input type="text" name="lastName" placeholder="Last name" value={user.lastName} onChange={handleChange} required/>
              <input type="text" name="email" placeholder="Email" value={user.email} onChange={handleChange} required/>
              <input type="text" name="phone" placeholder="Phone number" value={user.phone} onChange={handleChange} required/>
              <textarea name="address" value={user.address} placeholder="Address" onChange={handleChange} required/>
              <button type="submit">UPDATE</button>
              <div className="update-user-error-message">
                <p>
                  {errorText && 
                <p>{errorText}</p>
                  }
                </p>
              </div>
            </form>
            )}

            <div className="logout-option">
              <Link to="/" className="logout-link" onClick={handleLogout}>
                <FontAwesomeIcon className="logout-icon" icon={faArrowRightFromBracket} size="lg"/>
                Log out
              </Link>
            </div>
          </div>

        </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile;