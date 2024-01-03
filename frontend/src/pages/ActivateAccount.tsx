import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { activateAccount } from "../redux/slices/users/userSlice";
import { AppDispatch, RootState } from "../redux/store";


const ActivateAccount = () => {

    document.title = "Activate account";

    const { error } = useSelector((state: RootState) => state.users);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if(error) {
          toast.error(error)
        }
    }, [error]);

    const { token } = useParams();
    const decoded: any = jwtDecode(String(token));
    const fullName = decoded ? `${decoded.firstName} ${decoded.lastName}` : "";

    const handleActivateAccount = async () => {
        const response = await dispatch(activateAccount(String(token)));
        toast.success(response.payload.message);
    }

    return (
            <div className="activate-container">
                <div className="activate-main-content">
                    <div>
                        <h1 className="activation-title">Activate your account</h1>
                    </div>

                    <div className="activation-text">
                        <p>Welcome <b>{fullName}</b>,</p>
                        <p>To activate your account, please click the activation button below.
                        Thank you for choosing us, and get ready to explore a world of shopping delights!</p>
                    </div>
                    
                    <div className="activation-btn">
                        <button onClick={handleActivateAccount}>Activate Now</button>
                    </div>
                </div>
            </div>
    );
}

export default ActivateAccount;