import React from "react";
import {useState, useEffect} from 'react';
// import './headerdashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const header =() => {
const navigate = useNavigate(); 

const [isHovered, setIsHovered] = useState(false);
const [userData, setUserData] = useState({
  email_address: "Guest"
});

useEffect(() => {
  const userCookie = getCookie('user_data');
  if (userCookie) {
    const parsedUserData = JSON.parse(userCookie);
    setUserData(parsedUserData);  // Update state with the parsed cookie data
  }
}, []);

const handleLogout = (e) => {
    e.preventDefault();
    console.log('Logging out');
    sessionStorage.clear();
    navigate('/login');
  };

  
 

  

    return (
        <div className="Header">
          <div
        onMouseEnter={() => setIsHovered(true)}  // Show the menu when hovered
        onMouseLeave={() => setIsHovered(false)}  // Hide the menu when hover stops
        // style={{ listStyleType: "none" }}
       
      >
                 <FontAwesomeIcon 
                    icon={faUserCircle} 
                    className="topnav-right" 
                    onClick={handleLogout} // Logout on icon click
                />
            </div>
              {isHovered && (
                    <div className="menu-content"  style={{ float: 'right', height: '25px' }}>
                        <span>{userData.email_address}</span>  {/* Display user's email */}
                        
                    </div>
                )}
      
              <h2 className="dashboard-h2">Overview</h2>

        </div>
    );
};
export default header;
