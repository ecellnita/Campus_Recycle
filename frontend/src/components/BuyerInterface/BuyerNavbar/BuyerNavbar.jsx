import React, { useEffect, useState } from "react";
import "./BuyerNavbar.css";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BuyerNavbar() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileDrop, setProfileDrop] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();

  const toggleProfileDrop = () => {
    setProfileDrop(!profileDrop);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("campusrecycleuser"));
    setProfilePicture(user?.image);
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
    localStorage.removeItem('campusrecycletoken');
    localStorage.removeItem('campusrecycleuser');
    setActiveLink('logout');
    setTimeout(() => {
      navigate('/');
    }, 3000); // Delay to allow the toast message to be visible
  };

  return (
    <>
      <ToastContainer />
      <div className="buyer-navbar">
        <div className="buyer-navbar-logo">
          <img src="/logo.png" alt="" style={{ cursor: 'pointer' }} onClick={()=>{
            if(window.location.pathname === '/buyer/productlist'){
              window.location.reload();
            }else{
              navigate('/buyer/productlist');
            }
          }} />
        </div>
        <div className="buyer-navbar-options">
          <Link
            to="/buyer/productlist"
            className={`buyer-navbar-options-item ${
              window.location.pathname === "/buyer/productlist" ? "active" : ""
            }`}
          >
            Products
          </Link>
          <Link className="buyer-navbar-options-item" to='/buyer/product-requests' >Your Requests</Link>
          <Link className="buyer-navbar-options-item" to='/about'>About</Link>
          {/* <Link className="buyer-navbar-options-item">Reviews</Link> */}
        </div>
        <div className="buyer-navbar-accounts">
          <div className="toggle" onClick={toggleProfileDrop}>
            <Menu size={20} />
            <img
              src={profilePicture ? profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
              alt=""
            />
          </div>
          {profileDrop && (
            <div className="dropdown">
              <Link to="/student-profile">See Profile</Link>
              <Link to="/seller/seller-dashboard">Switch to Seller</Link>
              <Link
                to="#"
                onClick={handleLogout}
                className={activeLink === 'logout' ? 'active' : ''}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BuyerNavbar;
