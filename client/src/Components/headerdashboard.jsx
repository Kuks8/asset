import React from "react";
// import './headerdashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const header =({ user }) => {
const navigate = useNavigate(); 

const handleLogout = (e) => {
    e.preventDefault();
   
    console.log('Logging out');
    document.cookie = 'user_data=; Max-Age=0; path=/'; // Clear the cookie
    sessionStorage.clear();
    navigate('/login');
  };

    return (
        <div className="Header">
          <div>
           <FontAwesomeIcon 
        icon={faUserCircle} 
        className="topnav-right" 
        onClick={handleLogout} 
      />
      {user ? <span>{userData.email_address}</span> : <span>Guest</span>}
        </div>
              <h2 className="dashboard-h2">Overview</h2>

        </div>
    );
};
export default header;
