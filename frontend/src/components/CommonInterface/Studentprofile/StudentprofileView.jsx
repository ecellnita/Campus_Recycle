import React, { useEffect, useState } from "react";
import "./StudentprofileView.css";
import { Camera, Pencil } from "lucide-react";
import Spinner from "react-bootstrap/Spinner";
import { apiConnector } from "../../../utils/Apiconnecter";
import { authroutes } from "../../../apis/apis";
import { useNavigate } from "react-router-dom";

function StudentprofileView() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setloading] = useState(false);
  const [updateProfileFormdata, setUpdateProfileFormdata] = useState({
    // image: '',
    firstname: '',
    lastname: '',
    gender: '',
    enrollmentno: '',
    contactno: '',
    about: '',
    graduationyr: ''
  });

  const profilePicUpdateOnchange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setUpdateProfileFormdata({ ...updateProfileFormdata, image: reader.result });
    };
  }

  const updateProfileFormdataOnchage = (e) => {
    setUpdateProfileFormdata({ ...updateProfileFormdata, [e.target.name]: e.target.value });
  }

  const updateUser = async() => {
    try {
      console.log("data being sent: ", updateProfileFormdata);
      const api_header = {
        Authorization: `Bearer ${localStorage.getItem("campusrecycletoken")}`,
        "Content-Type": "multipart/form-data",
      };
      const responseObj = await apiConnector(
        "POST",
        authroutes.UPDATE_USER,
        updateProfileFormdata,
        api_header
      )

      console.log(responseObj.data);
      if(responseObj.data.success){
        console.log("success");
        const user = JSON.stringify(responseObj.data.data);
        localStorage.setItem('campusrecycleuser', user);
        setUserDetails(user);
        setUpdateProfileFormdata({
          firstname: '',
          lastname: '',
          gender: '',
          enrollmentno: '',
          contactno: '',
          about: '',
          graduationyr: ''
         
        })
        setloading(false);
        window.location.reload();
      }else{
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    setloading(true);
    try {
      console.log("data being sent: ", updateProfileFormdata);
      const api_header = {
        Authorization: `Bearer ${localStorage.getItem("campusrecycletoken")}`,
        "Content-Type": "multipart/form-data",
      };
      const responseObj = await apiConnector(
        "POST",
        authroutes.UPDATE_PROFILE,
        updateProfileFormdata,
        api_header
      )

      console.log(responseObj.data);
      if(responseObj.data.success){
        console.log("success");
        updateUser();
      }else{
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }


  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('campusrecycleuser'));

    setUserDetails(user);
  }, []);
  return (
    <div className="profile-view">
      <div className="top">
        <img
          src={userDetails && userDetails.image}
          alt=""
        />
      </div>
      <div className="profile-details">
        <div>
          <h4>{userDetails && userDetails.firstname} {userDetails && userDetails.lastname}</h4>
          <p>{userDetails && userDetails.email}</p>
        </div>
      </div>
      
      <div className="edit-profile-section">
        <div className="edit-profile-form">
          <form onSubmit={handleSubmit}>
            {/* <div className="edit-profile-input-0">
              {
                <>
                  <label className="edit-profile-img-overlay" htmlFor="dp_img" >
                    <Camera/>
                  </label>
                  <input type="file" accept="image/png, image/jpg, image/jpeg" id="dp_img" onChange={(e)=>profilePicUpdateOnchange(e)} hidden/>
                </>
              }
              <img src={updateProfileFormdata.image !== '' ? updateProfileFormdata.image : (userDetails && userDetails.image)} alt="profile" />
            </div> */}
            <div className="edit-profile-input-1">
              <div>
                <label htmlFor="firstname">Firstname</label>
                <input type="text" id="firstname" name="firstname" value={updateProfileFormdata.firstname} onChange={updateProfileFormdataOnchage} required/>
              </div>
              <div>
                <label htmlFor="lastname">Lastname</label>
                <input type="text" id="lastname" name="lastname" value={updateProfileFormdata.lastname} onChange={updateProfileFormdataOnchage} required/>
              </div>
              <div>
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" value={updateProfileFormdata.gender} onChange={updateProfileFormdataOnchage} required>
                  <option value="">Choose gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="enrollment">Enrollment No.</label>
                <input type="text" id="enrollment" name="enrollmentno" value={updateProfileFormdata.enrollmentno} onChange={updateProfileFormdataOnchage} required/>
              </div>
              <div>
                <label htmlFor="contact" >Contact No.</label>
                <input type="number" id="contact" name="contactno" value={updateProfileFormdata.contactno} onChange={updateProfileFormdataOnchage} required/>
              </div>
              <div>
                <label htmlFor="year" >Graduation Year</label>
                <select id="year" name="graduationyr" value={updateProfileFormdata.graduationyr} onChange={updateProfileFormdataOnchage} required>
                  <option value="">Choose Graduation Year</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div>
                <label htmlFor="about" >About</label>
                <textarea rows={5} id="about" name="about" value={updateProfileFormdata.about} onChange={updateProfileFormdataOnchage} required/>
              </div>
              <button>Update</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default StudentprofileView;
