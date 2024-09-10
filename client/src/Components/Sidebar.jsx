import React from 'react';
import explogo from '../img/explogo.png';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faTachometer, faLaptop, faUsers, faSliders, faSearch, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import{useState, useEffect} from 'react';
    
    const Sidebar = () => {
      const location = useLocation();
      const [custodiansOpen, setCustodiansOpen] = useState(false);
      const [assetsOpen, setAssetsOpen] = useState(false);
      const [HasRoleType, setHasRoleType] = useState(false);
      // const [isRegisterVisible, setIsRegisterVisible] = useState(false);

      const toggleCustodians = () => {
        setCustodiansOpen(!custodiansOpen);
      };

      const toggleAssets =() => {
        setAssetsOpen(!assetsOpen);
      }

      useEffect(() => {
        const fetchUserRoles = async () => {
          try {
            const response = await fetch('http://localhost:8000/api/users.php'); 
            const data = await response.json();
            
            // Check if roles array exists and contains role_type
            if (data.roles && data.roles.length > 0) {
              setHasRoleType(data.roles); // The user has a role_type
            } else {
              setHasRoleType([]); // The user does not have a role_type
            }
          } catch (error) {
            console.error('Error fetching user roles:', error);
            setHasRoleType([]); // In case of error, don't show the register link
          }
        };
    
        fetchUserRoles();
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

          
            {/* <li className={location.pathname === '/Components/custodians' ? 'active' : ''}>
          <Link to="/Components/custodians">
          <FontAwesomeIcon icon={faUsers} className="fa-icon"/>CUSTODIANS</Link>
          </li> */}
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
        
                 {/* {isRegisterVisible && (
            <li className={location.pathname === '/register' ? 'active' : ''}>
              <Link to="/register">
                <FontAwesomeIcon icon={faSliders} className="fa-icon1" /> REGISTER
              </Link>
            </li>
          )} */}
          {HasRoleType.length > 0 && ( 
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
    
    