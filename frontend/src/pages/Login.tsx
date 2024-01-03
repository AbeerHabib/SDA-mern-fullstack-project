import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../redux/store";
import { login } from "../redux/slices/users/userSlice";

const Login = ({pathName}: {pathName: string}) => {

    document.title = "Login";

    const { userData, error } = useSelector((state: RootState) => state.users);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    const [errorText, setError] = useState("");

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if(error) {
          toast.error(error)
        }
    }, [error]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
        setError('');
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            if(user.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;   
            }
            const passwordTestCondition = /[^a-zA-Z0-9]/;
            if(!passwordTestCondition.test(user.password)) {
                setError('Password must contains at least one symbole, one number, and one letter');
                    return;   
            }            
            const response = await dispatch(login(user));
            toast.success(response.payload.message);
            
            navigate(pathName ? pathName : `/dashboard/${userData && userData.isAdmin? 'admin' : 'user'}`);
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="login-container">
            <div className="login">

                <div className="login-img">
                    <img src="public/images/iphone15.png" alt="" width="320"/>
                </div>

                <div className="login-details">
                    <div className="login-details-title">
                        <h1>Welcome Back!</h1>
                        <p>Please enter your details</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="login-details-input">
                            <input type="email" name="email" id="email" value={user.email} onChange={handleChange} placeholder="Email" required/>
                            <input type="password" name="password" id="password" value={user.password} onChange={handleChange} placeholder="Password" required/>

                            <div>
                                <Link to="/forgot-password" className="forgot-password-link">
                                    <p>Forgot password?</p>
                                </Link>
                            </div>

                            <div className="login-error-message">
                                {errorText &&
                                <p>{errorText}</p>
                                }
                            </div>
                        </div>

                        <div className="login-details-btn">
                            <button type="submit">Log in</button>
                        </div>
                    </form>
                            
                    <div className="login-details-signup">
                        <p>Dont have an account?</p>
                        <Link to="/signup" className="login-details-signup-link">
                            <p>Sign up</p>
                        </Link>
                    </div>
                </div>     
            </div>
        </div>
    );
}

export default Login;