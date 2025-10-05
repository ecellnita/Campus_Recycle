import React, { useEffect, useState } from "react";
import "./ActivitySection.css";
import Googleicon from "../../../../images/google-icon.png";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Eye } from 'lucide-react';
import Spinner from "react-bootstrap/Spinner";
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { authroutes } from "../../../../apis/apis";
import { apiConnector } from "../../../../utils/Apiconnecter";


function ActivitySection() {
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    msg: '',
    type: ''
  });

  const [passView, setPassView] = useState(false);
  const togglePassView = () => {
    if(passView){
      setPassView(false);
    }else{
      setPassView(true);
    }
  }
  
  const [activity, setActivity] = useState(false);
  const toggleActivity = () => {
    if (activity) {
      setActivity(false);
      setVerificationStage(false);
    } else {
      setActivity(true);
    }
  };

  const [otp, setOtp] = useState("");

  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
    otp: "",
    accounttype: "Buyer"
   
  })

  const [verificationStage, setVerificationStage] = useState(false);
  
  const toggleVerificationStage = async(e) => {
    e.preventDefault();

    if(!recaptchaVerifiedRegister){
      return setErrorMsg({
        msg: "Please verify the captcha",
        type: 'Captcha not verified while registration'
      })
    }

    setloading(true);
    try {
      const response = await apiConnector(
        "POST",
        authroutes.SEND_OTP_API,
        {
          email: signUpDetails.email
        }
      )
      console.log(response.data);
      if(response.data.success){
        setSignUpDetails({...signUpDetails, otp: response.data.data.otp});
        if (verificationStage) {
          setVerificationStage(false);
          setloading(false);
        } else {
          setVerificationStage(true);
          setloading(false);
        }
      }else{
        if(response.data.message === "User already Registered"){
          setErrorMsg({
            msg: "User already Registered",
            type: 'email already exists'
          })
        }
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };


  const handleOnchangeSignup = (e) => {
    setSignUpDetails({...signUpDetails, [e.target.name]: e.target.value})
  }

  const handleSignup = async(e) => {
    e.preventDefault();
    
    setloading(true);
    if(signUpDetails.otp !== otp){
      setloading(false);
      return setErrorMsg({msg: "Incorrect OTP", type: "otp did not matched"});
    }
    try {
      console.log("data being sent: ", signUpDetails);
      const responseObj = await apiConnector(
        "POST",
        authroutes.SIGNUP_API,
        signUpDetails
      )

      console.log(responseObj.data);
      if(responseObj.data.success){

        console.log("success");
        setSignUpDetails({
          email: "",
          firstname: "",
          lastname: "",
          password: "",
          confirmpassword: "",
          otp: "",
          accounttype: "Buyer"
         
        })
        setloading(false);
        navigate('/getstarted');
      }else{
        if(responseObj.data.message === "User already Registered"){
          setErrorMsg({
            msg: "User already Registered",
            type: 'email already exists'
          })
        }
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })
  const handleOnchangelogin = (e) => {
    setLoginDetails({...loginDetails, [e.target.name]: e.target.value})
  }
  const handleLogin = async(e) => {
    e.preventDefault();

    if(!recaptchaVerified){
      return setErrorMsg({
        msg: "Please verify the captcha",
        type: 'Captcha not verified'
      })
    }

    setloading(true);

    try {
      const responseObj = await apiConnector(
        "POST",
        authroutes.LOGIN_API,
        loginDetails
      )
      console.log(responseObj);
      if(responseObj.data.success){
        localStorage.setItem("campusrecycletoken", responseObj.data.token);
        localStorage.setItem("campusrecycleuser", JSON.stringify(responseObj.data.data));
        setloading(false);
        setLoginDetails({
          email: "",
          password: ""
        })
        navigate('/getstarted');
      }else{
        if(responseObj.data.message === "User Not Registered"){
          setErrorMsg({
            msg: "User Not Registered",
            type: 'email does not exists'
          })
        }else if(responseObj.data.message === "Password is Incorrect"){
          setErrorMsg({
            msg: "Password is Incorrect",
            type: 'wrong password'
          })
        }
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }


  const [passMatched, setPassMatched] = useState(false);
  useEffect(()=>{
    if(signUpDetails.password !== signUpDetails.confirmpassword){
      setPassMatched(false);
    }else{
      setPassMatched(true);
    }
  })


  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  function recaptchaOnchange() {
    setRecaptchaVerified(true);
  }

  const [recaptchaVerifiedRegister, setRecaptchaVerifiedRegister] = useState(false);
  function recaptchaOnchangeRegister() {
    setRecaptchaVerifiedRegister(true);
  }

  useEffect(()=>{
    if(window.location.pathname.split("-")[1] === 'signup'){
      setActivity(true);
    }
  }, []);

  return (
    <div className="activity-body">
      <div
        className={`container ${activity ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <span className="activity-logo">
            <img src="./logo.png" alt="" />
          </span>
          {
            !verificationStage &&
            <form onSubmit={toggleVerificationStage}>
              <h2 style={{ marginBottom: '1rem' }}>Create Account</h2>
              {/* <div className="social-container">
                <button className="activity-signin-google-btn">
                  <img src={Googleicon} className="" alt="" /> Sign up with Google
                </button>
              </div> */}
              {/* <span>or use your email for registration</span> */}
              <input type="text" placeholder="First Name" name="firstname" value={signUpDetails.firstname} onChange={handleOnchangeSignup} required/>
              <input type="text" placeholder="Last Name" name="lastname" value={signUpDetails.lastname} onChange={handleOnchangeSignup} required/>
              <input type="email" placeholder="Email" name="email" value={signUpDetails.email} onChange={handleOnchangeSignup} required/>
              <p className="login-signup-error-msg">{errorMsg.type === 'email already exists' ? errorMsg.msg : ''}</p>
              <div className="login-signup-password-div">
                <input type={passView ? "text" : "password"} placeholder="Password" name="password" value={signUpDetails.password} onChange={handleOnchangeSignup} required/>
                <Eye size={20} style={{cursor: 'pointer'}} onClick={togglePassView}/>
              </div>
              <div className="login-signup-password-div">
                <input type={passView ? "text" : "password"} placeholder="Confirm Password" name="confirmpassword" value={signUpDetails.confirmpassword} onChange={handleOnchangeSignup} required/>
                <Eye size={20} style={{cursor: 'pointer'}} onClick={togglePassView}/>
              </div>
              <p className="login-signup-error-msg">{!passMatched && 'Password not matched'}</p>
              {/* Captcha */}
              <HCaptcha
                // sitekey={process.env.CAPTCHA_SITEKEY}
                sitekey="342a82a4-2f5c-4348-942e-999cd9eccc3a"
                onVerify={recaptchaOnchangeRegister}
              />
              <p className="login-signup-error-msg">{errorMsg.type === 'Captcha not verified while registration' ? errorMsg.msg : ''}</p>
              <button type="submit" className={`${passMatched ? '' : 'btn-disabled'} ${loading ? 'btn-disabled' : ''}`} disabled={!passMatched}>Sign Up {loading && <Spinner className="login-signup-btn-spinner" size="sm" animation="border" />}</button>
              <p className="activity-donthaveaccnt">
                Already have an account?{" "}
                <Link onClick={toggleActivity}>Sign in</Link>
              </p>
            </form>
          }
          {
            verificationStage &&
            <form onSubmit={handleSignup}>
              <h1>Verify Email</h1>
              <input type="text" placeholder="Enter OTP Sent to Your Email" value={otp} onChange={(e)=>setOtp(e.target.value)} required/>
              <p className="login-signup-error-msg">{errorMsg.type === 'otp did not matched' ? errorMsg.msg : ''}</p>
              <button type="submit" className={loading ? 'btn-disabled' : ''}>Verify {loading && <Spinner className="login-signup-btn-spinner" size="sm" animation="border" />}</button>
              <p className="activity-donthaveaccnt">
                Already have an account?{" "}
                <Link onClick={toggleActivity}>Sign in</Link>
              </p>
            </form>
          }
        </div>
        <div className="form-container sign-in-container">
          <span className="activity-logo">
            <img src="./logo.png" alt="" />
          </span>
          <form onSubmit={handleLogin}>
            <h2 style={{ marginBottom: '1rem' }}>Sign in </h2>
            {/* <div className="social-container">
              <button className="activity-signin-google-btn">
                <img src={Googleicon} className="" alt="" /> Sign in with Google
              </button>
            </div> */}
            {/* <span>or use your account</span> */}
            <input type="email" placeholder="Email" name="email" value={loginDetails.email} onChange={handleOnchangelogin} required/>
            <p className="login-signup-error-msg">{errorMsg.type === 'email does not exists' ? errorMsg.msg : ''}</p>
            <div className="login-signup-password-div">
            <input type={passView ? "text" : "password"} placeholder="Password" name="password" value={loginDetails.password} onChange={handleOnchangelogin} required/>
              <Eye size={20} style={{cursor: 'pointer'}} onClick={togglePassView}/>
            </div>
            <p className="login-signup-error-msg">{errorMsg.type === 'wrong password' ? errorMsg.msg : ''}</p>
            {/* Captcha */}
            <HCaptcha
              // sitekey={process.env.CAPTCHA_SITEKEY}
              sitekey="979e4300-1752-49e6-8e58-1388e9befe64"
              onVerify={recaptchaOnchange}
            />
            <p className="login-signup-error-msg">{errorMsg.type === 'Captcha not verified' ? errorMsg.msg : ''}</p>
            <Link to='/forgotpassword'>Forgot your password?</Link>
            <button type="submit" className={loading ? 'btn-disabled' : ''} >Sign In {loading && <Spinner className="login-signup-btn-spinner" size="sm" animation="border" />}</button>
            <p className="activity-donthaveaccnt">
              Don't have an account?{" "}
              <Link onClick={toggleActivity}>Sign up</Link>
            </p>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <Carousel>
                <Carousel.Item>
                  <img
                    src="https://cdn.dribbble.com/userupload/10957436/file/original-f9c117451ef8c95fd574b63d18ae9389.png?resize=400x0"
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src="https://cdn.dribbble.com/userupload/10957436/file/original-f9c117451ef8c95fd574b63d18ae9389.png?resize=400x0"
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src="https://cdn.dribbble.com/userupload/10957436/file/original-f9c117451ef8c95fd574b63d18ae9389.png?resize=400x0"
                    alt=""
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="overlay-panel overlay-right">
              <Carousel>
                <Carousel.Item>
                  <img
                    src="https://cdn.dribbble.com/userupload/10957436/file/original-f9c117451ef8c95fd574b63d18ae9389.png?resize=400x0"
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src="https://cdn.dribbble.com/userupload/10957436/file/original-f9c117451ef8c95fd574b63d18ae9389.png?resize=400x0"
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src="https://cdn.dribbble.com/userupload/10957436/file/original-f9c117451ef8c95fd574b63d18ae9389.png?resize=400x0"
                    alt=""
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivitySection;
