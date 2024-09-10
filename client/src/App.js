import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
// import AssetsView from './JSON data/assetsview.json';



import Register from "./register"
import  Login  from "./login";
import Dashboard from './dashboard';
import Assets from './Components/assets';
import Custodians from './Components/custodians';
import Settings from './Components/settings';
import AssignCustodian from './Components/Assigncustodian';
import AssetType from './Components/assettype';
import {AssetTypeProvider} from './Filters/assettypecontext';


function App() {
  
 
  const [currentForm, setCurrentForm] = useState('Login');
  
  

  const toggleform = (formName) => {
    console.log("formName:::", formName);
    setCurrentForm(formName);
  }
  return (
    <Router>
    {/* <div className=""> */}
    <AssetTypeProvider>
       <Routes>
          <Route path='/login' exact element={<Login onFormSwitch={toggleform} />} />
          <Route path='/' element={<Login  onFormSwitch={toggleform}/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/Components/assets' element={<Assets/>} />
          <Route path='/Components/custodians' element={<Custodians/>} />
          <Route path='/Components/settings' element={<Settings/>} />
          <Route path="/Components/type/asset" element={<AssetType/>} />
          <Route path="/Components/custodian/assign" element={<AssignCustodian/>}/>
          <Route path='/register' element={<Register  onFormSwitch={toggleform}/>} />
          <Route
            path="/Login"
            element={
              currentForm === "Login" ? (
                <Register onFormSwitch={toggleform} />
              ) : (
                <Login onFormSwitch={toggleform} />
              )
            }
            
          />
      


        </Routes>
     </AssetTypeProvider>
    
    </Router>
  );
}

export default App;
