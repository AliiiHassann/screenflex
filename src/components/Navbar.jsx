import React, { useEffect, useState } from "react";
import logo from "../assets/logo.690db83fedbc448aa5a0.png";
import "../styles/Navbar.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
export const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  // for searchbar
  const [inputVal, setInputVal] = useState("");
  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  // handle searchbar
  const navigate = useNavigate();
  function handleSearch(e) {
    let query = e.target.value;

    if (query === "") {
      navigate("/");
    } else {
      navigate(`/search/${query}`);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
  }, []);
  return (
    <nav
      className={`navbar ${
        navState ? "navbar-show" : "navbar-not-shown"
      } navbar-expand-lg navbar-dark z-2 p-3 ps-5 pe-5 sticky-top top-0 `}
    >
      <div className='container-fluid'>
        <Link to={"/"}>
          <img width={"210px"} src={logo} alt='No' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={` collapse navbar-collapse ms-2`}
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav me-auto ms-2'>
            <li className='nav-item'>
              <NavLink
                to={"/"}
                className={`${
                  pathname === "/" ? "nav-active" : ""
                } nav-link poppins-bold nav-font `}
              >
                Home
              </NavLink>
            </li>
            <li className='dropdown nav-item'>
              <NavLink
                className={`${
                  pathname === "/discover/movies" ? "nav-active" : ""
                } ${
                  pathname === "/discover/tv" ? "nav-active" : ""
                } nav-link poppins-bold text-decoration-none dropdown-toggle`}
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                aria-current='page'
                to='/discover'
              >
                Discover
              </NavLink>
              <ul className='dropdown-menu text-center'>
                <li>
                  <NavLink
                    className='nav-link text-dark'
                    aria-current='page'
                    onClick={() => window.scrollTo(0, 0)}
                    to='/discover/movies'
                  >
                    Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='nav-link text-dark'
                    aria-current='page'
                    onClick={() => window.scrollTo(0, 0)}
                    to='/discover/tv'
                  >
                    TV Shows
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <NavLink
                to={"/movies"}
                className={` ${
                  pathname === "/movies" ? "nav-active" : ""
                } nav-link poppins-bold nav-font `}
              >
                Movies
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={"/tv"}
                className={`${
                  pathname === "/tv" ? "nav-active" : ""
                } nav-link poppins-bold nav-font `}
              >
                TV Shows
              </NavLink>
            </li>
          </ul>
          <input
            type='search'
            id='search'
            className='me-5 search form-control w-25 poppins-bold nav-font '
            placeholder='Search'
            onChange={handleSearch}
            value={inputVal}
            onInput={(e) => setInputVal(e.target.value)}
          />
          <ul
            className={`d-flex justify-content-start navbar-nav flex-row navbar-log ${
              !navState ? " align-items-center ps-0 pt-1" : ""
            }`}
          >
            <li className='nav-item'>
              <NavLink
                to={"/login"}
                className={`${
                  pathname === "/login" ? "nav-active" : ""
                } nav-link poppins-bold nav-font `}
              >
                Login
              </NavLink>
            </li>
            <span className='nav-span'></span>
            <li className='nav-item'>
              <NavLink
                to={"/register"}
                className={`${
                  pathname === "/register" ? "nav-active" : ""
                } nav-link poppins-bold nav-font `}
              >
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
