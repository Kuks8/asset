import React from 'react';
import explogo from '../img/explogo.png';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faTachometer, faLaptop, faSliders, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import{useState, useEffect} from 'react';
    
    const Sidebar = () => {
      const location = useLocation();
      const [custodiansOpen, setCustodiansOpen] = useState(false);
      const [assetsOpen, setAssetsOpen] = useState(false);
      const [isSystemAdmin, setIsSystemAdmin] = useState(false);

      const toggleCustodians = () => {
        setCustodiansOpen(!custodiansOpen);
      };

      const toggleAssets =() => {
        setAssetsOpen(!assetsOpen);
      }

      useEffect(() => {
        // Get the roles from sessionStorage
        const storedRoles = sessionStorage.getItem('userRoles');
        console.log('Stored roles in sessionStorage:', storedRoles);  
      
        if (storedRoles) {
          const roles = JSON.parse(storedRoles);
          console.log('Parsed roles:', roles);  
      
          // Check if roles include "SYSTEM_ADMIN"
          if (roles.includes('SYSTEM_ADMIN')) {
            setIsSystemAdmin(true);
            console.log("User is a system admin");  
          }
        }
      }, []);
      
      
      

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

        

          <li
            onMouseEnter={toggleAssets}
            onMouseLeave={toggleAssets}
            className={assetsOpen ? 'active' : ''}
          >
            <div className="menu-item">
              <Link to="/Components/assets">
              <FontAwesomeIcon icon={faLaptop} className="fa-icon" /> 
              ASSETS
              <FontAwesomeIcon icon={faChevronRight} className="fa-icon2" /></Link>
            </div>
            {assetsOpen && (
              <ul className="submenu">
                <li className={location.pathname === '/Components/type/asset' ? 'active' : ''}>
                  <Link to="/Components/type/asset">Asset Type</Link>
                </li>
              </ul>
            )}
          </li>

    
          <li
            onMouseEnter={toggleCustodians}
            onMouseLeave={toggleCustodians}
            className={custodiansOpen ? 'active' : ''}
          >
            <div className="menu-item">
              <Link to="/Components/custodians">
              <FontAwesomeIcon icon={faLaptop} className="fa-icon" /> 
              CUSTODIANS
              <FontAwesomeIcon icon={faChevronRight} className="fa-icon2" /></Link>
            </div>
            {custodiansOpen && (
              <ul className="submenu">
                <li className={location.pathname === '/Components/custodian/assign ' ? 'active' : ''}>
                  <Link to="/Components/custodian/assign">Assign</Link>
                </li>
              </ul>
            )}
          </li>


                 <li className={location.pathname === '/Components/settings' ? 'active' : ''}>
                   <Link to="/Components/settings">
                   <FontAwesomeIcon icon={faSliders} className="fa-icon1" /> SETTINGS</Link>
                 </li>
        
        
          {isSystemAdmin && ( 
            <li className={location.pathname === '/register' ? 'active' : ''}>
                   <Link to="/register">
                   <FontAwesomeIcon icon={faSliders} className="fa-icon1" /> REGISTER</Link>
                 </li>
          
           )}
          </ul>
          </div>

      
        </div>
        
      );
    };
    
    export default Sidebar;
    
    