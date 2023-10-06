import { useState } from "react";
import { useUserContext } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const {handleLogin} = useUserContext();
    const [loginInfo, setLoginInfo] = useState({ email: undefined, password: undefined });
    const navigate = useNavigate();

    const handleFormChange = (event) => {
        setLoginInfo(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const loggedIn = await handleLogin(loginInfo.email, loginInfo.password);

        if (loggedIn) {
            navigate("/profile");
        }
    }

    return (
        <>
            <section className="mt-5 row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" id="email" required placeholder="Please enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" id="password" required placeholder="Enter your password" />
                                </div>
                                <button type="submit" className="btn btn-primary" >Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;