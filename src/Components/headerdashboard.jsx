import React from "react";
// import './headerdashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const header =() => {
const navigate = useNavigate(); 

const handleLogout = (e) => {
    e.preventDefault();
   
    console.log('Logging out');
    navigate('/login');
  };

    return (
        <div className="Header">
           <FontAwesomeIcon 
        icon={faUserCircle} 
        className="topnav-right" 
        onClick={handleLogout} 
      />
        
              <h2 className="dashboard-h2">Overview</h2>

        </div>
    );
};
export default header;
