import React, { useEffect, useState } from "react";
import "./SellerTopNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SellerTopNavbar() {
  const [userDetails, setUserDetails] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileDrop, setProfileDrop] = useState(false);
  const navigate = useNavigate();

  const toggleProfileDrop = () => {
    setProfileDrop(!profileDrop);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("campusrecycleuser"));
    setProfilePicture(user?.image);
    setUserDetails(user);
  }, []);

  const handleLogout = () => {
    toast.info('🚀 You have successfully logged out. See you soon!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    localStorage.removeItem("campusrecycletoken");
    localStorage.removeItem("campusrecycleuser");
    setTimeout(() => {
      navigate("/");
    }, 3000); // Delay to allow the toast message to be visible
  };

  return (
    <div className="seller-top-navbar">
      <ToastContainer />
      <div className="profile" onClick={toggleProfileDrop}>
        <img
          src={profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
          alt=""
        />
        <div>
          <h6>{userDetails?.firstname}</h6>
          <p>{userDetails?.email}</p>
        </div>
      </div>
      {profileDrop && (
        <div className="dropdown">
          <Link to="/student-profile">See Profile</Link>
          <Link to="/buyer/productlist">Switch to Buyer</Link>
          <Link onClick={handleLogout} className="logout-button">Logout</Link>
        </div>
      )}
    </div>
  );
}

export default SellerTopNavbar;
