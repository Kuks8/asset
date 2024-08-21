import React, { useState } from 'react';
import { Form, Input, Button, Table, Space} from 'antd';
import { PlusOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../dashboard.css';
import Sidebar from './Sidebar';

const OtherSettings = () => {
    const navigate = useNavigate(); 
  const [form] = Form.useForm();
  const [assetTypes, setAssetTypes] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [newAssetType, setNewAssetType] = useState('');

  const handleLogout = (e) => {
             e.preventDefault();
           
            console.log('Logging out');
             navigate('/login');
          };

  const isEditing = (record) => record.key === editingKey;

  const addAssetType = () => {
    setAssetTypes([...assetTypes, { key: Date.now().toString(), type: newAssetType }]);
    setNewAssetType('');
    form.resetFields();
  };

  const edit = (record) => {
    form.setFieldsValue({ type: record.type });
    setEditingKey(record.key);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...assetTypes];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setAssetTypes(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setAssetTypes(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Asset Type',
      dataIndex: 'type',
      key: 'type',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);

    return editable ? (
          <Space>
            <Button onClick={() => save(record.key)} icon={<SaveOutlined />} />
          </Space>
        ) : (
          <Space>
            <Button disabled={editingKey !== ''} onClick={() => edit(record)} icon={<EditOutlined />} />
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <div className="dashboard_wrapper">
    <Sidebar/>
       
        <div className="Header">
        <FontAwesomeIcon 
        icon={faUserCircle} 
        className="topnav-right" 
        onClick={handleLogout} 
      />
              <h2 className="dashboard-h2">Asset Settings</h2>
        </div> 
       
          <div className="dashboardpage">
      <Form layout="inline" form={form}>
        <Form.Item
          name="type"
          rules={[{ required: true, message: 'Please input the asset type!' }]}
        >
          <Input
            placeholder="Add new asset type"
            value={newAssetType}
            onChange={(e) => setNewAssetType(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={addAssetType} icon={<PlusOutlined />}>
            Add
          </Button>
        </Form.Item>
      </Form>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={assetTypes}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>
    </div>
  );
};

export default OtherSettings;

// import React, {useState, useContext, createContext} from 'react';
// import { Form, Input, Select, DatePicker, InputNumber, Upload, Button, Space, Avatar } from 'antd';
// import { UploadOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import {Card } from 'antd';
// import {Flex, Tooltip} from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import Sidebar from './Sidebar';
// import '../dashboard.css';

// const OtherSettings = () => {
//     const navigate = useNavigate(); 
    
    
//     const { Option } = Select;
//     // const { assetTypes, setAssetTypes } = useContext(AssetTypeContext);
//     const [profilePicture, setProfilePicture] = useState(null);
//     const [newAssetType, setNewAssetType] = useState('');
    
    
//       const onFinish = (values) => {
//         console.log('Received values:', values);
//       };
    
//       const handleUpload = (info) => {
//         const reader = new FileReader();
//         reader.onload = e => {
//           setProfilePicture(e.target.result);
//         };
//         reader.readAsDataURL(info.file.originFileObj);
//       };
    
//       const handleLogout = (e) => {
//         e.preventDefault();
       
//         console.log('Logging out');
//         navigate('/login');
//       };
    
//       // const handleAddAssetType = () => {
//       //   setAssetTypes([...assetTypes, newAssetType]);
//       //   setNewAssetType('');
//       // };
    
//       const columns = [
//         {
//           title: 'Asset Type',
//           dataIndex: 'type',
//           key: 'type',
//         },
//       ];
    
//       // const data = assetTypes.map((type, index) => ({ key: index, type }));
    
//       return (
       
//         <div className="dashboard_wrapper">
//         <Sidebar/>
            
//             <div className="Header">
//             <FontAwesomeIcon 
//             icon={faUserCircle} 
//             className="topnav-right" 
//             onClick={handleLogout} 
//           />
//                   <h2 className="dashboard-h2">Asset Settings</h2>
//             </div> 
            
//               <div className="dashboardpage"> 
                
//                 <div>
//                 <Form.Item label="Add New Asset Type" className="item8">
//                     <Space>  
//                       <Input
//                         value={newAssetType}
//                         onChange={(e) => setNewAssetType(e.target.value)}
//                         placeholder="Enter new asset type"
//                         />
                     
//                       <Flex >
//                         <Flex >
//                            <div className="setbutton">
//                           <Tooltip title="Add Asset Type" >
//                       <Button type="default"  icon={<PlusOutlined /> }
//                       // onClick={handleAddAssetType} 
                      
//                       />
//                           </Tooltip>  
//                           </div>
//                       </Flex>
//                       </Flex>
                     
//                      </Space>
//                      </Form.Item>
//                      </div>
//             </div>
//           </div>
        
//          );
//         };  
    
    
    
    

// export default OtherSettings;
