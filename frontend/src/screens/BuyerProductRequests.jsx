import React, { useEffect } from 'react';
import BuyerSidebar from '../components/CommonInterface/Studentprofile/StudentprofileSidebar';
import ProductRequest from '../components/BuyerInterface/BuyerProductRequests/ProductRequest';
import SellerTopNavbar from '../components/SellerInterface/SellerDashboard/SellerTopNavbar';
import { useNavigate } from 'react-router-dom';

function BuyerProductRequests() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('campusrecycletoken')){
      navigate('/');
    }
  }, []);
  return (
    <>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <BuyerSidebar/>
            <SellerTopNavbar/>
        </div>
        <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
            <ProductRequest/>
        </div>
        {/* <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
            <BuyerSidebar/>
            <ProductRequest/>
        </div> */}
    </>
  )
}

export default BuyerProductRequests