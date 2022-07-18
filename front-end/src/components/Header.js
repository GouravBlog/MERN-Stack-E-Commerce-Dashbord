import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/signUp");
  };
  return (
    <div>
      <header>
        <nav>
          {auth ? (
            <ul>
              <li>
                <NavLink to="/">Products</NavLink>
              </li>
              <li>
                <NavLink to="/addProduct">Add Product</NavLink>
              </li>
              <li>
                <NavLink to="/updateproduct/:id"></NavLink>
              </li>
              <li>
                <NavLink onClick={logout} to="/login">
                  Logout ({JSON.parse(auth).name})
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to="/SignUp">SignUp</NavLink>
              </li>
              <li>
                <NavLink to="/login">login</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
