import React, { useState } from "react";
import "./LandingNavbar.css";
import { Menu, Plus, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function LandingNavbar() {
  const navigate = useNavigate();
  const [showHamNav, setShowHamNav] = useState(false);
  const [moreExpand, setMoreExpand] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleShowNav = () => {
    setShowHamNav((prev) => !prev);
    setMoreExpand(false);
  };

  const expandOrCollapseMore = () => {
    setMoreExpand((prev) => !prev);
  };

  return (
    <div className="landing-navbar">
      {/* Left Section */}
      <div className="landing-navbar-left">
        <div className="landing-navbar-left-logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="landing-navbar-left-explore">
          <p>Explore &rarr;</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="landing-navbar-right">
        {/* Desktop Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="dropbtn">
            More <ChevronDown size={18} />
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              <Link to="/contact">Contact Us</Link>
              <Link to="/about">About</Link>
              <Link to="/feedback">Feedback</Link>
            </div>
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="landing-navbar-right-btn-sec">
          <button
            className="landing-navbar-right-btn-login"
            onClick={() => navigate("/student-login")}
          >
            Log in
          </button>
          <button
            className="landing-navbar-right-btn-signup"
            onClick={() => navigate("/student-signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Hamburger Icon (mobile only) */}
        <Menu
          className="landing-navbar-right-hammenu"
          size={30}
          onClick={toggleShowNav}
        />
      </div>

      {/* Mobile Hamburger Menu */}
      {showHamNav && (
        <div className="landing-hamburger-menu">
          <div className="landing-hamburger-menu-top">
            <div
              className="landing-navbar-left-logo"
              onClick={() => navigate("/")}
            >
              <img src="/logo.png" alt="Logo" />
            </div>
            <Plus
              style={{ rotate: "45deg", cursor: "pointer" }}
              size={30}
              onClick={toggleShowNav}
            />
          </div>

          <div className="landing-hamburger-menu-btns">
            <button
              className="landing-hamburger-menu-btn-login"
              onClick={() => {
                navigate("/student-login");
                toggleShowNav();
              }}
            >
              Log in
            </button>
            <button
              className="landing-hamburger-menu-btn-signup"
              onClick={() => {
                navigate("/student-signup");
                toggleShowNav();
              }}
            >
              Sign Up
            </button>
            <button
              className="landing-hamburger-menu-btn-more"
              onClick={expandOrCollapseMore}
            >
              More{" "}
              <ChevronDown
                className={moreExpand ? "rotate-90" : ""}
                size={18}
                style={{ marginLeft: "4px" }}
              />
            </button>
          </div>

          {moreExpand && (
            <div className="landing-hamburger-menu-more-expanded">
              <Link to="/contact" onClick={toggleShowNav}>
                Contact Us
              </Link>
              <Link to="/about" onClick={toggleShowNav}>
                About
              </Link>
              <Link to="/feedback" onClick={toggleShowNav}>
                Feedback
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LandingNavbar;
