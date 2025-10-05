import React, { useEffect } from 'react';
import SellerSidebar from '../components/SellerInterface/SellerDashboard/SellerSidebar';
import SellerTopNavbar from '../components/SellerInterface/SellerDashboard/SellerTopNavbar';
import SellerOverview from '../components/SellerInterface/SellerDashboard/SellerOverview';
import { useNavigate } from 'react-router-dom';

function SellerDashboard() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('campusrecycletoken')){
      navigate('/');
    }
  }, []);
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <SellerSidebar/>
        <SellerTopNavbar/>
      </div>
      <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
        <SellerOverview/>
      </div>
    </>
  )
}

export default SellerDashboard