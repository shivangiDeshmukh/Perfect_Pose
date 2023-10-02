import React from "react";
import './navbar.css';
import { Link, useMatch, useResolvedPath ,useNavigate ,Navigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { GrYoga } from "react-icons/gr";

export default function Navbar() {
  const navigate = useNavigate(); 
  const auth = getAuth();

  const handleLogout =() => {
    // app.auth().signOut();
  signOut(auth).then(() => {
    console.log("logged out");
  }).catch((error) => {
    // An error happened.
    console.log("error");
  });

  navigate("/login");
  }

  return (
    <div className="body">
    <div className="menu">
      <a><Link to="/"><GrYoga/>PerfectPose</Link></a>
      <div class="menu-right">
        <a><Link to="/Aboutafterlogin">About Us</Link></a>
        <a><Link to ="/List">Exercises List</Link></a>
        {/* <a><Link to ="/">Profile</Link></a> */}
        <button className="cta-btn"  onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </div>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}