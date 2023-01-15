import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div className="main-header">
      <div className="main-header-inner">
        <div className="main-header-left">
          <Link to="/">TODO List</Link>
        </div>
        <div className="main-header-right">
          {user ? (
            <>
              <button onClick={onLogout} className="main-header-bt">
                Logout
              </button>
            </>
          ) : (
            <>
              {Location.pathname === "/login" ? (
                <Link to="/register" className="main-header-bt">
                  Register
                </Link>
              ) : (
                <Link to="/login" className="main-header-bt">
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
