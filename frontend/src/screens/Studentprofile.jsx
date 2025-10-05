import React, { useEffect } from 'react'
import BuyerSidebar from '../components/CommonInterface/Studentprofile/StudentprofileSidebar'
import StudentprofileView from '../components/CommonInterface/Studentprofile/StudentprofileView'
import { useNavigate } from 'react-router-dom';

function BuyerProfile() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('campusrecycletoken')){
      navigate('/');
    }
  }, []);
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
        <BuyerSidebar/>
        <StudentprofileView/>
      </div>
    </>
  )
}

export default BuyerProfile