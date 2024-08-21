import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Table, Button, Flex, Tooltip, pagination } from "antd";
import {
  MenuUnfoldOutlined,
  PlusOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Card, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { data } from "../JSON data/usersdetails";
import "../dashboard.css";
import Userformfilter from "../Filters/userformfilter";
 import Userassetmodal from "../Filters/ userassetinfo";
import Usersort from "../Filters/usersort";






const Custodians = () => {
  const [selectedrow, setSelectedRow] = useState();
  const [map, setMap] = useState();
  const [open, setOpen] = useState(false);
   
  const [openUsersortModal, setUsersortModal] = useState(false)

  const showUserformfilter = () => {
    console.log("button clicked");
    setOpen(true);
  };
  
  const showUsersort = () => {
    console.log("button clicked");
    setUsersortModal(true);
  };

  const handleCloseUserassetmodal=()=>{setSelectedRow(null)}

  const closeUserformfilter = () => {
    setOpen(false);
  };

  const closeUsersort = () => {
    setUsersortModal(false);
  };

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    console.log("Logging out");
    navigate("/login");
  };

  const columns = [

    {
      title: "FNAME",
      dataIndex: "fname",
      key: "fname",
      
    },
    {
      title: "LNAME",
      dataIndex: "lname",
      key: "lname",
      
    },
    {
      title: "ECARD_ID",
      dataIndex: "ecard_id",
      key: "ecard_id",
    },
    {
      title: "HIREDATE",
      dataIndex: "hiredate",
      key: "hiredate",
    },

    {
      title: "ASSETS",
      dataIndex: "assets",
      key: "assets",
    },

    {
      title: "DEPARTMENT",
      dataIndex: "department",
      key: "department",
    },
  ];
    
 

  
  



  return (
    <div className="dashboard_wrapper">
      <Userassetmodal row={selectedrow} openModal={selectedrow} onModalClose={handleCloseUserassetmodal}/>
      {open && (
        <Userformfilter openModal={open} onModalClose={closeUserformfilter} />
      )}

      {openUsersortModal && (
        <Usersort openModal={openUsersortModal} onModalClose={closeUsersort} />
      )}
      <Sidebar />

      <div className="Header">
      <FontAwesomeIcon 
        icon={faUserCircle} 
        className="topnav-right" 
        onClick={handleLogout} 
      />
        <h2 className="dashboard-h2">Custodians</h2>
      </div>

      <div className="custodianpage">
        {/* <div className="sidebar-footer"> */}
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        {/* </div> */}
        <Space className="Filters">

          <Card className="Filters">
                    <Space>
                    <Flex gap="large" vertical>
                      <Flex wrap gap="large">
                      <Tooltip title="Sort">
                      <Button type="text" shape="triangle" icon={<BarsOutlined className= "icon asset-icon"
                       
                      />}
                      onClick={showUsersort}
                      />
                      
                      </Tooltip>
                      </Flex>
                      </Flex>
                    </Space>
                  </Card>
         

          <Card className="Filters2">
            <Space>
              <Flex gap="large" vertical>
                <Flex wrap gap="large">
                  <Tooltip title="New Employee">
                    <Button
                      type="text"
                      shape="triangle"
                      icon={<PlusOutlined className="icon asset-icon" />}
                      onClick={showUserformfilter}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </Space>
          </Card>
        </Space>
      

      <Table
        className="assetbox"
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
             setSelectedRow(record)
            },
          };
        }}
      />
      </div>
    </div>
  );
};

export default Custodians;
