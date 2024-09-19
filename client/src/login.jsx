import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import explogo from "./img/explogo.png";
import './index.css';

const Login = () => {
  const [email_address, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email_address', email_address);
    formData.append('password', password);
    formData.append('request', 'login');

    try {
      const response = await fetch('http://localhost:8000/api/users.php', {
        method: 'POST',
        body: formData,
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login response:', data);  // Debugging line

      if (data.code === 1) {  // Check for successful login
        const { user_id, email_address, employee_id, ip_address, roles } = data.data;  
        // console.log('User roles:', roles);

        sessionStorage.setItem('user_id', user_id);
        sessionStorage.setItem('email_address', email_address);
        sessionStorage.setItem('employee_id', employee_id);
        sessionStorage.setItem('ip_address', ip_address);
        sessionStorage.setItem('userRoles', JSON.stringify(roles));

        navigate("/dashboard");
      } else {
        alert("Navigation failed: " + data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="App">
      <div className="Login">
        <div className="logo">
          <img src={explogo} alt="explogo" className="logo-img"/>
        </div>
        <h2>ASSET MANAGEMENT</h2>
        <p>Welcome Back!</p>
        <hr/>
        <form onSubmit={handleLogin}>
          <div className="input_parent">
            <input
              value={email_address}
              onChange={(e) => setEmail(e.target.value)}
              type="email"  // Changed from 'email_address' to 'email'
              placeholder="Email Address"
              id="email_address"
              name="email_address"
              className="email_address"
            />
            <div className="icon_parent">
              <MdOutlineAlternateEmail className="icon" color="grey" />
            </div>
          </div>

          <div className="input_parent">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              className="Password"
            />
            <div className="icon_parent">
              <RiLockPasswordLine className="icon" color="grey" />
            </div>
          </div>

          <button
            type="submit"
            className="button login-button"
          >
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
