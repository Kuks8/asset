import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import explogo from "./img/explogo.png";
// import './login.css'
import './index.css';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleNavigateToDashboard = (e)=>{
    e.preventDefault();
    navigate("/dashboard");
  }

  const handleNavigateToRegister=(e)=>{
    e.preventDefault()
    navigate("/Register");
  }

  return (
 <div className="App">
     <div className="Login">

<div className="logo"><img src={explogo} alt="explogo" className="logo-img"/></div>

<h2>ASSET MANAGEMENT</h2>
<p>Welcome Back!</p>
<hr/>

<form>
  <div className="input_parent">
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      placeholder="email"
      id="email"
      name="email"
      className="email"
    />
    <div className="icon_parent">
      <MdOutlineAlternateEmail classname="icon" color="grey" />
    </div>
  </div>

  <div className="input_parent">
    <input
      value={Password}
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      placeholder="password"
      id="password"
      name="password"
      className="Password"
    />
    <div className="icon_parent">
      <RiLockPasswordLine classname="icon" color="grey" />
    </div>
  </div>

  <button
    onClick={handleNavigateToDashboard}
    className=" button login-button"
  >
    Login
  </button>
  <NavLink
    className="link-btn"
    to="../Register"
  >
    {" "}
    Don't have an account? Register here.
  </NavLink>
</form>
</div>
 </div>
   
  );
};
export default Login;
