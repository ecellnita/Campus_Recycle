import React from "react";
import "./SellerOverview.css";
import DasboardCardImg from '../../../images/dashboard-card-img.png';
import { ChevronDown } from "lucide-react";

function SellerOverview() {
  return (
    <div className="seller-dashboard-overview">
      <div className="top">
        <h2>Welcome to Campus Recycle !</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit officiis !</p>
      </div>
      {/* <div className="overview-body">
        <h5>Try things out</h5>
        <div className="overview-body-cards">
          <div className="overview-body-card">
            <img src={DasboardCardImg} alt="" />
            <span className="overview-body-card-badge">
              &#9733; 1 Min non-technical
            </span>
            <h4>Set up your profile</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="card-footer">
              <span>
                Learn more <ChevronDown size={15} style={{rotate: '-90deg'}}/>
              </span>
              <button>
                Settings
              </button>
            </div>
          </div>
          <div className="overview-body-card">
            <img src={DasboardCardImg} alt="" />
            <span className="overview-body-card-badge">
              &#9733; 1 Min non-technical
            </span>
            <h4>Set up your profile</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="card-footer">
              <span>
                Learn more <ChevronDown size={15} style={{rotate: '-90deg'}}/>
              </span>
              <button>
                Settings
              </button>
            </div>
          </div>
          <div className="overview-body-card">
            <img src={DasboardCardImg} alt="" />
            <span className="overview-body-card-badge">
              &#9733; 1 Min non-technical
            </span>
            <h4>Set up your profile</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="card-footer">
              <span>
                Learn more <ChevronDown size={15} style={{rotate: '-90deg'}}/>
              </span>
              <button>
                Settings
              </button>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default SellerOverview;
