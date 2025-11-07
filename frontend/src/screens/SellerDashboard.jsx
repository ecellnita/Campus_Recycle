import React, { useEffect } from 'react';
import SellerSidebar from '../components/SellerInterface/SellerDashboard/SellerSidebar';
import SellerTopNavbar from '../components/SellerInterface/SellerDashboard/SellerTopNavbar';
import SellerOverview from '../components/SellerInterface/SellerDashboard/SellerOverview';
import { useNavigate } from 'react-router-dom';
import './SellerDashboard.css';

function SellerDashboard() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('campusrecycletoken')){
      navigate('/');
    }
  }, []);
  return (
    <div className="seller-dashboard-container">
      <div className="seller-dashboard-header">
        <SellerSidebar/>
        <SellerTopNavbar/>
      </div>
      <div className="seller-dashboard-content">
        <SellerOverview/>
      </div>
    </div>
  )
}

export default SellerDashboard