import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, BarsOutlined} from "@ant-design/icons";
import {Card, Space} from 'antd';
import Sidebar from './Sidebar';
import { Table, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../dashboard.css';
import {data} from '../JSON data/assetsview';
import {Flex, Tooltip } from 'antd';
import Assetsformfilter from '../Filters/assetsformfilter';
import Assetmodal from "../Filters/assetimage";
import Assetsort from "../Filters/assetsort";


const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const Assets = () => {
  const [selectedrow, setSelectedRow] = useState();
  const [map, setMap] = useState();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const [openAssetsortModal, setAssetsortModal] = useState(false)

  const showAssetsformfilter = () => {
    console.log("button clicked");
    setOpen(true);
  };

  const showAssetsort = () => {
    console.log("button clicked");
    setAssetsortModal(true);
  };

  const handleCloseAssetmodal=()=>{setSelectedRow(null)}

  const closeAssetsformfilter = () => {
    setOpen(false);
  };

  const closeAssetsort = () => {
    setAssetsortModal(false);
  };

const navigate = useNavigate(); 

const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState({
    email_address: "Guest"
  });

useEffect(() => {
  const userCookie = getCookie('user_data');
  if (userCookie) {
    const parsedUserData = JSON.parse(userCookie);
    setUserData(parsedUserData);  // Update state with the parsed cookie data
  }
}, []);

  const handleLogout = (e) => {
    e.preventDefault();
   
    console.log('Logging out');
    navigate('/login');
  };

  const handleSort = (sortType) => {
    let sortedData = [...data];
    if (sortType === 'newest') {
      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === 'oldest') {
      sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === 'ascending') {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'descending') {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    }
    setData(sortedData);
    setAssetsortModal(false);
  };

  const columns = [
    {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
},

{
  title: 'SERIALNO',
  dataIndex: 'serialno',
  key: 'serialno',
},

{
  title: 'TYPE',
  dataIndex: 'type',
  key: 'type',
},

{
  title: 'MODEL',
  dataIndex: 'model',
  key: 'model',
},

{
    title: 'SOFTWARES',
    dataIndex: 'softwares',
    key: 'softwares',
},

{
  title: 'ASSIGN_STATUS',
  dataIndex: 'assign_status',
  key: 'assign_status',
},

{
  title: 'ASSIGNED_TO',
  dataIndex: 'assigned_to',
  key: 'assigned_to',
},

{
  title: 'ASSET_STATUS',
  dataIndex: 'asset_status',
  key: 'asset_status',
},

];


  return (
   
    <div className="dashboard_wrapper">

      <Assetmodal row={selectedrow} openModal={selectedrow} onModalClose={handleCloseAssetmodal}/>
      {open && 
      <Assetsformfilter openModal={open} onModalClose={closeAssetsformfilter}/>
    }

{openAssetsortModal && (
        <Assetsort openModal={openAssetsortModal} onModalClose={closeAssetsort} onSort={handleSort} />
      )}

    <Sidebar/>
        
          <div className="Header">
            <div
              onMouseEnter={() => setIsHovered(true)}  // Show the menu when hovered
              onMouseLeave={() => setIsHovered(false)}  // Hide the menu when hover stops
            >
          <FontAwesomeIcon 
        icon={faUserCircle} 
        className="topnav-right" 
        onClick={handleLogout} 
      />
      </div>
      {isHovered && (
                    <div className="menu-content"  style={{ float: 'right', height: '25px' }}>
                        <span>{userData.email_address}</span>  {/* Display user's email */}
                        
                    </div>
                )}
              <h2 className="dashboard-h2">Assets</h2>
              </div>   

         
          <div className="assetspage">
            
            {/* <div className="sidebar-footer"> */}
              <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button>
              <FontAwesomeIcon icon={faSearch} />
              </button>
               </div>
            {/* </div> */}
              
              
                <Space className="Filters" >
                  <Card className="Filters">
                    <Space>
                    <Flex gap="large" vertical>
                      <Flex wrap gap="large">
                      <Tooltip title="Sort">
                      <Button type="text" shape="triangle" icon={<BarsOutlined className= "icon asset-icon"
                       
                      />}
                      onClick={showAssetsort}
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
                      <Tooltip title="Add Asset">
                      <Button type="text" shape="triangle" icon={<PlusOutlined className= "icon asset-icon"
                       
                      />}
                      onClick={showAssetsformfilter }
                      />
                      
                      </Tooltip>
                      </Flex>
                    </Flex>
                     
                    </Space>
                  </Card>

                </Space>
                
            

            <Table className="assetbox"
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


export default Assets;