import React from 'react'
import BuyerNavbar from '../components/BuyerInterface/BuyerNavbar/BuyerNavbar'
import AboutHero from '../components/About/AboutHero'
import AboutContent from '../components/About/AboutContent'
import LandingFooter from '../components/CommonInterface/Landing/LandingFooter/LandingFooter'
import AboutBenifits from '../components/About/AboutBenifits'

function About() {
  return (
    <>
        <BuyerNavbar/>
        <AboutHero/>
        <AboutContent/>
        <AboutBenifits/>
        <LandingFooter/>
    </>
  )
}

export default About