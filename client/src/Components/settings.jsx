import React, {useState, useEffect} from 'react';
import { Form, Select, DatePicker, InputNumber, Upload, Button, Space, Avatar } from 'antd';
import { UploadOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import '../dashboard.css';
// import AssetTypeContext from "../Filters/assettypecontext";

const Settings = () => {
const navigate = useNavigate(); 


const { Option } = Select;
// const { assetTypes, setAssetTypes } = useContext(AssetTypeContext);
const [profilePicture, setProfilePicture] = useState(null);
const [newAssetType, setNewAssetType] = useState('');


  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleUpload = (info) => {
    const reader = new FileReader();
    reader.onload = e => {
      setProfilePicture(e.target.result);
    };
    reader.readAsDataURL(info.file.originFileObj);
  };

  const handleLogout = (e) => {
    e.preventDefault();
   
    console.log('Logging out');
    navigate('/login');
  };

 

  const columns = [
    {
      title: 'Asset Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  useEffect(() => {
    // Make API call to PHP endpoint
    fetch('http://localhost/Api/.php')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);


  return (
   
    <div className="dashboard_wrapper">
    <Sidebar/>
        
        <div className="Header">
        <FontAwesomeIcon 
        icon={faUserCircle} 
        className="topnav-right" 
        onClick={handleLogout} 
      />
              <h2 className="dashboard-h2">General Settings</h2>
        </div> 
        
          <div className="dashboardpage">
        
          <div >
            <div className='Profile'>
            <Form.Item className="Setprofile">
              <br/>
            <Space direction="vertical" align="center">
              <Avatar
                size={100}
                src={profilePicture}
                icon={!profilePicture && <UserOutlined />}
                style={{ borderRadius: '50%', marginBottom: 16 }}
              
              />
              <Upload 
                name="profile"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleUpload}
              >
                <Button type="default" shape="triangle"icon={<UploadOutlined />} className='Profilebutton'> Change Profile  </Button>
              </Upload>
            </Space>
          </Form.Item>
</div>
        <div className="settings-grid-form">
          

            <Form className="Setform" layout="vertical" onFinish={onFinish} initialValues={{
                    language: 'en',
                    country: 'Ghana',
                    timezone: 'GMT',
                    textSize: 14,
                    theme: 'light',
                    dashboardFields: 10,
                  }}
                >
                  <div className='item1'>
                  <Form.Item label="Language " name="language" className="Labels">
                    <span>
                    <Select>
                      <Option value="en">English</Option>
                      <Option value="es">Spanish</Option>
                      <Option value="fr">French</Option>
                      <Option value="zh">Chinese</Option>
                    </Select>
                    </span>
                  </Form.Item>
                  </div>

                  <div className='item2'>
                  <Form.Item label="Country" name="country" className="Labels">
                  <span>
                    <Select >
                      <Option value="us">United States</Option>
                      <Option value="uk">United Kingdom</Option>
                      <Option value="ca">Canada</Option>
                      <Option value="gh">Ghana</Option>
                      <Option value="fr">France</Option>
                      <Option value="cn">China</Option>
                      <Option value="de">Germany</Option>
                      <Option value="it">Italy</Option>
                      <Option value="ng">Nigeria</Option>
                      <Option value="tg">Togo</Option>

                    </Select>
                    </span>
                  </Form.Item>
                  </div>

                  <div className='item3'>
                  <Form.Item label="Timezone" name="timezone"className="Labels">
                  <span>
                    <Select >
                      <Option value="GMT">GMT</Option>
                      <Option value="CST">CST</Option>
                      <Option value="EST">EST</Option>
                    </Select>
                  </span>
                  </Form.Item>
                  </div>

                  <div className='item4'>
                  <Form.Item label="Date" name="date"  className="Labels">
                    <DatePicker className='datepicker'/>
                </Form.Item>
                </div>

              <div className='item5'>
              <Form.Item label="Text Size" name="textSize" className="Labels">
                <InputNumber min={10} max={30} className='input'/>
              </Form.Item>
              </div>

            
{/* 
                  <div className='item6'>
                  <Form.Item label="Fields to Display on Dashboard" name="dashboardFields" className="Labels">
                    <InputNumber min={5} max={20} className='input'/>
                  </Form.Item>
                  </div> */}

                  {/* <div className='item7'> */}
                   
                        
              
               {/* </div> */}
               
              

            <div className='item7'>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" className="setbutton">Save</Button>
                  <Button htmlType="reset" className="setbutton" >Reset</Button>
                </Space>
              </Form.Item>
              </div>
              
            </Form>
            
                      
                 
                 
        </div>
      </div>
      </div>
     </div>
     );
    };  



export default Settings;