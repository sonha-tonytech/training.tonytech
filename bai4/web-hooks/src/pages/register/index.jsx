import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "redux/actions/authActions";
import AuthLayout from "layouts/auth-layout";
import "./register.css";

const Register = () => {
  const [msg, setMsg] = useState("");
  const userNameInput = useRef(null);
  const passwordInput = useRef(null);
  const nameInput = useRef(null);
  const token = useSelector((reducer) => reducer.authReducer.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const userName = userNameInput.current.value.toLowerCase();
    const passWord = passwordInput.current.value;
    const name = nameInput.current.value;
    if (userName && passWord && name) {
      const newUser = {
        userName: userName,
        passWord: passWord,
        name: name,
      };
      dispatch(
        registerUser(newUser, (notice) => {
          if (notice === "Success") {
            alert("Success to register !!!");
            navigate("/login");
          } else setMsg(notice);
        })
      );
    } else setMsg("Register requires full information!");
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLayout>
      <div className="register-section">
        <div className="register-section-title">
          <h1>Register</h1>
        </div>
        <div className="register-section-content">
          <form className="form-register">
            <div>
              <label htmlFor="userName">Username</label>
              <input
                required
                type="text"
                className="col-des-12"
                placeholder="Type your username"
                ref={userNameInput}
              />
            </div>
            <div>
              <label htmlFor="passWord">Password</label>
              <input
                type="password"
                className="col-des-12"
                placeholder="Type your password"
                ref={passwordInput}
              />
            </div>
            <div>
              <label htmlFor="Name">Your Name</label>
              <input
                type="name"
                className="col-des-12"
                placeholder="Type your name"
                ref={nameInput}
              />
            </div>
            <div className="msg-register">{msg}</div>
            <div>
              <button
                type="submit"
                className="col-des-12 btn btn-green btn-login"
                onClick={onSubmit}
              >
                Register
              </button>
            </div>
          </form>
          <div className="login-account">
            <h4>You have already account</h4>
            <Link to={"/login"}>
              <button className="btn btn-green btn-login">LOGIN</button>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
