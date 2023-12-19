import React from "react";
import "./sideMenu.scss";
import logo from "../../logo/main-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
function SideMenu() {
  const navigate = useNavigate();
  const logOut = ()=>{
    
    localStorage.removeItem('userLogin')
    navigate("/")
  }
  return (
    <div className="side-menu">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="menu-items">
        <ul className="items">
          <li className="item">
            <Link to="/all">AllCategories</Link>
          </li>
          <li className="item">
            <Link to="/domestics">Domestics</Link>
          </li>
          <li className="item">
            <Link to="/outbound">Outbound</Link>
          </li>
          <li className="item">
            <Link to="/historical">Historical Tours</Link>
          </li>
          <li className="item">
            <Link to="/nileCruise">Nile Cruise</Link>
          </li>
          <li className="item">
            <Link to="/dayTour">Day Tours</Link>
          </li>
          <li className="item">
            <Link to="/Hajj">Hajj & Omrah</Link>
          </li>
          <li className="item">
          </li>
          {/* <li className="item">
            <Link to="/UpdateSliderImages">Update Slider Images</Link>
          </li> */}
        </ul>
           <Button variant="danger" onClick={()=>logOut()}>Log Out</Button>
      </div>
    </div>
  );
}

export default SideMenu;
