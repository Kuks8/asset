import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Space} from 'antd';
import { PlusOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../dashboard.css';
import Sidebar from './Sidebar';

const Assettype = () => {
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
    
    useEffect(() => {
      // Make API call to PHP endpoint
      fetch('http://localhost/Api/.php')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching users:', error));
    }, []);
  


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

export default Assettype;

