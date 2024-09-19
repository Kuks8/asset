import React from 'react';
import { useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Pagecontent from './Components/Pagecontent';
import Footer from './Components/Footer';

import Headerdashboard from './Components/headerdashboard';
import './dashboard.css';


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
}

const Dashboard = () => {

  useEffect(() => {
    const userCookie = getCookie('user_data'); // Retrieve the cookie
    if (userCookie) {
      const parsedData = JSON.parse(userCookie); // Parse the JSON string to object
      setUserData(parsedData); // Store the parsed data in state
    }
  }, []);


  return (
   <div className="dashboard-container">
    
    
   
    
<div className='dashboard_wrapper'>
<Headerdashboard user={userData}/>
          
          <div className='dashboardpage'>
                    <Pagecontent />
           </div>
                 <div className='dashboardfooter'>
                 <Footer/>
                 </div>
</div>
<Sidebar/>
    
     </div>
    
    
      
  );
};


export default Dashboard;
