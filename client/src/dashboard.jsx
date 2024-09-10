import React from 'react';
import Sidebar from './Components/Sidebar';
import Pagecontent from './Components/Pagecontent';
import Footer from './Components/Footer';

import Headerdashboard from './Components/headerdashboard';
import './dashboard.css';


const Dashboard = () => {

  // useEffect(() => {
  //   // Make API call to PHP endpoint
  //   fetch('http://localhost/Api/.php')
  //     .then(response => response.json())
  //     .then(data => setUsers(data))
  //     .catch(error => console.error('Error fetching users:', error));
  // }, []);


  return (
   <div className="dashboard-container">
    
    
   
    
<div className='dashboard_wrapper'>
<Headerdashboard />
          
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
