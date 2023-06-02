import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser} from "redux/actions/authactions";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "layouts/auth-layout";
import "./login.css";

const Login = () => {
  const [msg, setMsg] = useState("");
  const userNameInput = useRef(null);
  const passwordInput = useRef(null);
  const navigate = useNavigate();
  const token = useSelector((reducer) => reducer.authReducer.token);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const username = userNameInput.current.value.toLowerCase();
    const password = passwordInput.current.value;
    if (username && password) {
      const data = { userName: username, passWord: password };
      const userLogin = await dispatch(loginUser(data));
      userLogin ? navigate("/") : setMsg("Invalid User Login");
    } else setMsg("Login requires full username and password!");
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <AuthLayout>
      <div className="login-section">
        <div className="login-section-title">
          <h1>Login</h1>
        </div>
        <div className="login-section-content">
          <form className="form-login">
            <div>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="ip_user_name"
                className="col-des-12"
                name="userName"
                placeholder="Type your username"
                ref={userNameInput}
              />
            </div>
            <div>
              <label htmlFor="passWord">Password</label>
              <input
                type="password"
                className="col-des-12"
                name="passWord"
                placeholder="Type your password"
                ref={passwordInput}
              />
            </div>
            <div className="msg-login">{msg}</div>
            <div>
              <button
                type="submit"
                className="col-des-12 btn btn-green btn-login"
                onClick={onSubmit}
              >
                Login
              </button>
            </div>
          </form>
          <div className="register-account">
            <h4>Or Sign Up Using</h4>
            <Link to={"/register"}>
              <button className="btn btn-green btn-register">SIGN UP</button>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
