import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");

  const [error, setError] = useState({});

  useEffect(() => {
    if (isError) {
      setError(message);
      console.log(message);
      toast.error("you have some validation errors");
    }
    if (isSuccess || user) {
      // toast.success("Success Notification !", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not Match");
    } else {
      const userData = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="auth">
      <div className="auth-box">
        <div className="auth-header">
          <h1>Register</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="auth-field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            {error.name && <p className="auth-error">{error.name}</p>}
          </div>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {error.email && <p className="auth-error">{error.email}</p>}
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {error.password && <p className="auth-error">{error.password}</p>}
          </div>
          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            ></input>
            {error.confirmPassword && (
              <p className="auth-error">{error.confirmPassword}</p>
            )}
          </div>

          <div className="auth-footer">
            <button className="auth-btn" type="submit">
              Register
            </button>
            <div className="auth_register">
              <p>
                Do you have account ? <Link to="/">Login Now</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
