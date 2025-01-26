import React, { useEffect } from "react";
import "./BlogHomePage.css";
import { Link } from "react-router-dom";

const Header = () => {
  // useEffect(() => {
  //   fetch("http://localhost/3000/profile", {
  //     credentials: "include",
  //   });
  // }, []);
  return (
    <div>
      <header className="header">
        <h1 className="title">
          <Link to="/">BlogSphere</Link>
        </h1>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/login" className="nav-link">
                Login/Create
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      ;
    </div>
  );
};
export default Header;
