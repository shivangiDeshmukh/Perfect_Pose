import React from "react";
import { Link } from "react-router-dom";
import './landing.css'
import { GrYoga } from "react-icons/gr";

function Landing(){
    return(
        <div>
            {/* <p>Landing Page</p>
            <Link to ="signIn">Sign in</Link> */}
            <div className="header">
    
    <div className="menu">
      <a><Link to="/"><GrYoga/>PerfectPose</Link></a>
      <div class="menu-right">
        <a><Link to="chat">About Us</Link></a>
        <a><Link to ="login">Login</Link></a>
        <a><Link to ="signup">Sign Up</Link></a>
      </div>
    </div>

      <div className="hero-text">
        <h1 className="">Perfect Pose</h1>
        <div id="container">Discover 
        <div id="flip">
          <div><div>Perfect Pose</div></div>
          <div><div>your personal AI Exercise Coach</div></div>
          <div><div>developed using Deep Learning and AI/ML</div></div>
          </div>
          Strike a PERFECTPOSE on Point!
        </div>
        <a href="login" className="cta-btn">Get Started</a>
      </div>
    </div>
        </div>


    );
}

export default Landing