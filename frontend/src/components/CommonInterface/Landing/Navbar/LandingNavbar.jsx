import React, { useState } from 'react'
import './LandingNavbar.css'
import {Menu, Plus, ChevronDown} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function LandingNavbar() {
    const navigate = useNavigate();
    const [showHamNav, setShowHamNav] = useState(false);
    const toggleShowNav = () => {
        if(showHamNav){
            setShowHamNav(false);
            setMoreExpand(false);
        }else{
            setShowHamNav(true);
        }
    }

    const [moreExpand, setMoreExpand] = useState(false);
    const expandOrCollapseMore = () => {
        if(moreExpand){
            setMoreExpand(false);
        }else{
            setMoreExpand(true);
        }
    }

  return (
    <div className='landing-navbar'>
        <div className="landing-navbar-left">
            <div className="landing-navbar-left-logo">
                <img src="./logo.png" alt="" />
            </div>
            <div className="landing-navbar-left-explore">
                <p>Explore &rarr;</p>
            </div>
        </div>
        <div className="landing-navbar-right">
            <div class="dropdown">
                <div class="dropbtn"><ChevronDown /></div>
                <div class="dropdown-content">
                    <Link href="#">Contact Us</Link>
                    <Link href="#">About</Link>
                    <Link href="#">Feedback</Link>
                </div>
            </div>
            <div className='landing-navbar-right-btn-sec'>
                <button className='landing-navbar-right-btn-login' onClick={e => navigate('/student-login')}>Log in</button>
                <button className='landing-navbar-right-btn-signup' onClick={e => navigate('/student-signup')}>Sign Up</button>
            </div>
            <Menu className='landing-navbar-right-hammenu'size={30} onClick={toggleShowNav}/>
        </div>
        {
            showHamNav &&
            <div className="landing-hamberger-menu">
                <div className='landing-hamberger-menu-top'>
                <div className="landing-navbar-left-logo">
                    <img src="./logo.png" alt="" />
                </div>
                    <Plus style={{rotate: "45deg"}} size={30} onClick={toggleShowNav}/>
                </div>
                <div className="landing-hamberger-menu-btns">
                    <button className='landing-hamberger-menu-btn-login'>Log in</button>
                    <button className='landing-hamberger-menu-btn-signup'>Sign Up</button>
                    <button className='landing-hamberger-menu-btn-more' onClick={expandOrCollapseMore}>More <ChevronDown className={moreExpand ? 'rotate-90' : ''}/></button>
                </div>
                {
                    moreExpand &&
                    <div className='landing-hamberger-menu-more-expanded'>
                        <Link href="#">Contact Us</Link>
                        <Link href="#">About</Link>
                        <Link href="#">Feedback</Link>
                    </div>
                }
            </div>
        }
    </div>
  )
}

export default LandingNavbar