import React from 'react'
import './LandingFooter.css'
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'

function LandingFooter() {
  return (
    <div className='landing-footer'>
        <div className="landing-footer-logo">Campus Recycle</div>
        <div className="landing-footer-content">
            <div className='landing-footer-content-contact'>
                Contact | E-CELL NITA
            </div>
            <div className='landing-footer-content-copyright'>
                Copyright 2024 Campus Recycle - All rights reserved
            </div>
        </div>
        <div className='landing-footer-social-media'>
            <Linkedin className='landing-page-footer-bg'/>
            <Instagram className='landing-page-footer-bg'/>
            <Facebook className='landing-page-footer-bg'/>
            <Youtube className='landing-page-footer-bg'/>
        </div>
    </div>
  )
}

export default LandingFooter