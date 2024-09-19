import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Form, Input, Select, DatePicker, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../dashboard.css';
import Sidebar from './Sidebar';

const AssignCustodian = () => {
    const navigate = useNavigate(); 
    const [form] = Form.useForm();
    const { Option } = Select;

    const handleLogout = (e) => {
        e.preventDefault();
      
       console.log('Logging out');
        navigate('/login');
     };
     const onFinish = (values) => {
        console.log('Form Values:', values);

        form.resetFields();
      };

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
              <h2 className="dashboard-h2">Assign Custodian</h2>
        </div> 

        <Form form={form} 
        layout="vertical" 
        onFinish={onFinish}
        className="assign-form">
      {/* Employee Name Dropdown */}
      <Form.Item
        name="employeeName"
        label="Employee Name"
        rules={[{ required: true, message: 'Please select an employee' }]}
      >
        <Select placeholder="Select Employee">
          <Option value="employee1">Employee 1</Option>
          <Option value="employee2">Employee 2</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="department"
        label="Department"
        rules={[{ required: true, message: 'Please select a department' }]}
      >
        <Select placeholder="Select Department">
          <Option value="hr">Operations</Option>
          <Option value="it">Marketing</Option>
          
        </Select>
      </Form.Item>

      {/* Device Type Dropdown */}
      <Form.Item
        name="deviceType"
        label="Device Type"
        rules={[{ required: true, message: 'Please select a device type' }]}
      >
        <Select placeholder="Select Device Type">
          <Option value="laptop">Laptop</Option>
          <Option value="phone">Phone</Option>
          {/* Add more device type options here */}
        </Select>
      </Form.Item>

      {/* Serial Number Input */}
      <Form.Item
        name="serialNumber"
        label="Serial Number"
        rules={[{ required: true, message: 'Please enter the serial number' }]}
      >
        <Input placeholder="Enter Serial Number" />
      </Form.Item>

      {/* Number of Pieces Input */}
      <Form.Item
        name="pieces"
        label="Pieces"
        rules={[{ required: true, message: 'Please enter the number of pieces' }]}
      >
        <Input type="number" placeholder="Enter Number of Pieces" />
      </Form.Item>

      {/* Assign Date */}
      <Form.Item
        name="assignDate"
        label="Assign Date"
        rules={[{ required: true, message: 'Please select the assign date' }]}
      >
        <DatePicker placeholder="Select Date" style={{ width: '100%' }} />
      </Form.Item>

      {/* Device Picture Upload */}
      <Form.Item
        name="devicePicture"
        label="Device Picture"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: 'Please upload a device picture' }]}
      >
        <Upload listType="picture" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Upload Picture</Button>
        </Upload>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Assign Device
        </Button>
      </Form.Item>
    </Form>
       </div>
         );
        };
        
        export default AssignCustodian;