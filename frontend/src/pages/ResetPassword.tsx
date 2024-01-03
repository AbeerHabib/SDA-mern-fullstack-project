import jwtDecode from "jwt-decode";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { resetPassword } from "../redux/slices/users/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { resetPasswordType } from "../types/UserType";


const ResetPassword = () => {

    document.title = "Reset password";

    const { error } = useSelector((state: RootState) => state.users);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(error) {
          toast.error(error)
        }
    }, [error]);


    const [password, setPassword] = useState('');
    const [errorText, setError] = useState('');
    const { token } = useParams();
    const decoded = jwtDecode(String(token));

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setError('');
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
        if(password.length < 6) {
            setError('Password must be at least 6 characters');
            return;   
        }
        const passwordTestCondition = /[^a-zA-Z0-9]/;
        if(!passwordTestCondition.test(password)) {
            setError('Password must contains at least one symbole, one number, and one letter');
                return;   
        }
        const response = await dispatch(resetPassword({ token, password } as resetPasswordType));
        toast.success(response.payload.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="activate-container">
        <div className="activate-main-content">
            <div>
                <h1 className="reset-password-title">Reset Password</h1>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="forgot-password-input">
                        <input type="password" name="password" id="password" placeholder="password" onChange={handleChange} required/>
                                
                        <div className="error-message">
                            <p>
                                {errorText && 
                                <p>{errorText}</p>
                                } 
                            </p>
                        </div>
                    </div>

                    <div className="forgot-password-btn">
                        <button type="submit">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default ResetPassword;