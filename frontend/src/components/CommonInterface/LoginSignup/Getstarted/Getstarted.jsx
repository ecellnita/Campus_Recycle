import React, { useState } from "react";
import "./Getstarted.css";
import { FaRecycle, FaShopify } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Getstarted() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="getstarted-page">
      <div className="sidebar">
          <div className="landing-navbar-left-logo-getstarted">
              <img src="./logo.png" alt="" />
          </div>
        <div className="getstarted-page-headtext">
          How do you want to use Campus Recycle?
        </div>
        <div className="getstarted-page-subheadtext">
          We’ll personalize your setup experience accordingly.
        </div>
        <div className="getstarted-button">
          <button
            className={`sidebar-button ${
              activeButton === "button1" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("button1")}
          >
            <div className="sidebar-button-icon">
              <FaRecycle />
            </div>
            <div className="sidebar-button-text">
              <p className="sidebar-button-subtext"> I’m here to buy</p>
              <p> Evaluate tech skills at scale</p>
            </div>
          </button>
          <button
            className={`sidebar-button ${
              activeButton === "button2" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("button2")}
          >
            <div className="sidebar-button-icon">
              <FaShopify />
            </div>
            <div className="sidebar-button-text">
              <p className="sidebar-button-subtext"> I’m here to sale</p>
              <p> Solve problems and learn new skills</p>
            </div>
          </button>
          {activeButton === null && (
            <div className="create_account_button">
              <button className="defbutton">
              Get Satred
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>
            </div>
          )}
          {activeButton === "button1" && (
            <div className="create_account_button">
              <button className="button" onClick={()=>navigate('/buyer/productlist')}>
              Get Started
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>
            </div>
          )}
          {activeButton === "button2" && (
            <div className="create_account_button">
              <button className="button" onClick={()=>navigate('/seller/welcome')}>
                Get Started
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="content1">
        {activeButton === "button1" &&
        <div className="content-button1">

       
          
          
          </div>}
        {activeButton === "button2" && <div className="content-button1"></div>}
      </div>
    </div>
  );
}

export default Getstarted;
