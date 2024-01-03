import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { AppDispatch, RootState } from "../redux/store";
import { addUser, fetchUsers } from "../redux/slices/users/userSlice";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    document.title = "Signup";

    const { error } = useSelector((state: RootState) => state.users);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(error) {
          toast.error(error)
        }
    }, [error]);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        isAdmin: false,
        isBanned: false,
    });

    const [errorText, setError] = useState("");
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
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
            if(user.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;   
            }
            const passwordTestCondition = /[^a-zA-Z0-9]/;
            if(!passwordTestCondition.test(user.password)) {
                setError('Password must contains at least one symbole, one number, and one letter');
                    return;   
            }
            const response = await dispatch(addUser(user));
            toast.success(response.payload.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="signup-container">
            <div className="login">

                <div className="signup-img">
                    <img src="public/images/iphone15.png" alt="" width="320"/>
                </div>

                <div className="login-details">
                    <div className="signup-details-title">
                        <h1>Let's create your account!</h1>
                        <p>Please enter your details</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="login-details-input">
                          <div className="user-name-div">
                            <input className="user-fname" type="text" name="firstName" id="firstName" onChange={handleChange} placeholder="First Name" required/>
                            <input className="user-lname" type="text" name="lastName" id="lastName" onChange={handleChange} placeholder="Last Name" required/>
                          </div>
                          <input type="email" name="email" id="email" onChange={handleChange} placeholder="Email" required/>
                          <input type="password" name="password" id="password" onChange={handleChange} placeholder="Password" required/>
                          <input type="text" name="phone" id="phone" onChange={handleChange} placeholder="phone" required/>
                                    
                          <div className="error-message">
                            <p>
                            {errorText && 
                            <p>{errorText}</p>
                            }
                            </p>
                          </div>
                        </div>

                        <div className="login-details-btn">
                            <button type="submit">Sign up</button>
                        </div>
                    </form>
                            
                    <div className="login-details-signup">
                        <p>Already have an account?</p>
                        <Link to="/login" className="login-details-signup-link">
                            <p>Log in</p>
                        </Link>
                    </div>
                </div>     
            </div>
        </div>
    );
}

export default Signup;