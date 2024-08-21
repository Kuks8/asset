import React from 'react';
import explogo from '../img/explogo.png';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faTachometer, faLaptop, faUsers, faSliders, faSearch, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import{useState} from 'react';
    
    const Sidebar = () => {
      const location = useLocation();
      const [settingsOpen, setSettingsOpen] = useState(false);

      const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
      };

      return (
        
        <div className="sidebar">
          <div className="logo"><img src={explogo} alt="explogo" className="logo-img"/></div>
          <h2>ASSET <br/>MANAGEMENT</h2>
            <h3>
            <FontAwesomeIcon icon={faHome} className="fa-icon"/>MENU</h3>
            <hr />
            <div className="sidebar-content">
          <ul>
            <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">
          <FontAwesomeIcon icon={faTachometer} className="fa-icon"/>DASHBOARD</Link>
          </li>
            <li className={location.pathname === '/Components/assets' ? 'active' : ''}>
          <Link to="/Components/assets">
          <FontAwesomeIcon icon={faLaptop} className="fa-icon"/> ASSETS</Link>
          </li>
          
            <li className={location.pathname === '/Components/custodians' ? 'active' : ''}>
          <Link to="/Components/custodians">
          <FontAwesomeIcon icon={faUsers} className="fa-icon"/>CUSTODIANS</Link>
          </li>

            <li onMouseEnter={toggleSettings} onMouseLeave={toggleSettings} className={settingsOpen ? 'active' : ''}>
              <div>
              <FontAwesomeIcon icon={faSliders} className="fa-icon1" /> SETTINGS
              <FontAwesomeIcon icon={faChevronRight} className="fa-icon2" />
              </div>
              {settingsOpen && (
                 <ul className="submenu">
                 <li className={location.pathname === '/Components/settings/general' ? 'active' : ''}>
                   <Link to="/Components/settings/general">General Settings</Link>
                 </li>
                 <li className={location.pathname === '/Components/settings/other' ? 'active' : ''}>
                   <Link to="/Components/settings/other">Other Settings</Link>
                 </li>
               </ul>
              )}
          </li>

          
            
          </ul>
          </div>

      
        </div>
        
      );
    };
    
    export default Sidebar;
    
    