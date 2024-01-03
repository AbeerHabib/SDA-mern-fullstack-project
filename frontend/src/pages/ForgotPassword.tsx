import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../redux/store";
import { forgotPassword } from "../redux/slices/users/userSlice";


const ForgotPassword = () => {

    document.title = "Forgot password";

    const { error } = useSelector((state: RootState) => state.users);
    const [email, setEmail] = useState('');

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(error) {
          toast.error(error)
        }
    }, [error]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const response = await dispatch(forgotPassword(email));
        toast.success(response.payload.message);
    }

    return (
        <div className="activate-container">
            <div className="activate-main-content">
                <div>
                    <h1 className="activation-title">Forgot Password</h1>
                </div>

                <div className="activation-text">
                    <p>Enter your email and we will send you a link to reset your password</p>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="forgot-password-input">
                            <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} required/>
                        </div>

                        <div className="forgot-password-btn">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;