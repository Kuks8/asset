import React from 'react';
// import './Footer.css';
import {Typography} from "antd";
import { useNavigate } from 'react-router-dom';

  


const Footer = () => {
  const navigate = useNavigate();

  const showAssetspage= () => {
    navigate("/Components/assets"); 
  };

    return (
        <div className="Footer">

      <Typography.Link 
       className="Footer-Link"
      onClick={showAssetspage}
      >View All
      </Typography.Link>
        </div>
    );
};
export default Footer;