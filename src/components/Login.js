import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    // e.preventDefault();

    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
      toast.success("Login Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, error, navigate, dispatch]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setError("please enter all input fields");
    } else {
      const userData = {
        email: email,
        password: password,
      };

      dispatch(login(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="auth">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Login</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="auth-footer">
            {error && <p className="auth-error">{error}</p>}
            <button className="auth-btn" type="submit">
              Login
            </button>

            <div className="auth_register">
              <p>
                Don't have account ? <Link to="/register">Register Now</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
