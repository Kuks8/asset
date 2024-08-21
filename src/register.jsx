 import React, { useState } from "react";
 import {NavLink, useNavigate } from "react-router-dom";

 import { MdOutlineAlternateEmail } from "react-icons/md";
 import { RiLockPasswordLine } from "react-icons/ri";
 import { LiaIdCardAltSolid } from "react-icons/lia";
 import explogo from './img/explogo.png';
import './index.css'
 
  const Register = (props) => {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ecard_id, setEcard_id] = useState('');
  const navigate = useNavigate();
  
  

  const handleNavigateToDashboard = (e)=>{
    e.preventDefault();
    navigate("/dashboard");
  }

  const handleNavigateToLogin=(e)=>{
    e.preventDefault()
    navigate("/Login");
  }


   
  

  
 
   return  (
  <div className="App">
      <div className="Register">
          
          <div className="logo"><img src={explogo} alt="explogo" /></div>
          
           <h2>ASSET MANAGEMENT</h2>
           <p>Hi, Welcome!</p>
           <hr/>
     
           <form>
     
            <div className="input_parent">
            <input value ={email} onChange={(e) =>setEmail(e.target.value)}  type="email" placeholder="email" id="email" name="email"
            className="email"/> 
             <div className="icon_parent"><MdOutlineAlternateEmail classname="icon" color="grey"/></div>
            </div>
     
           <div className="input_parent">
             <input value ={Password} onChange={(e) =>setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password"
              className="Password"/>
             <div className="icon_parent"><RiLockPasswordLine classname="icon" color="grey"/></div>
           </div>
     
           <div className="input_parent">
             <input value ={ecard_id} onChange={(e) =>setEcard_id(e.target.value)} type="ecard_id" placeholder="ecard_id" id="ecard_id" name="ecard_id"
              className="email"/>
             <div className="icon_parent"><LiaIdCardAltSolid classname="icon" color="grey"/> </div>
           </div>
     
     
             <button onClick={handleNavigateToDashboard}
             className=" button Register-button">
               signup</button>
           
           <NavLink   className="link-btn"
               to="../Login"
             >
                Already have an account? Login</NavLink>
           </form>
         </div>
  </div>
    
  )
}
  export default Register;
