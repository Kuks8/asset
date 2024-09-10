
import React, { useState, useEffect} from 'react';
import { LaptopOutlined, TeamOutlined, ShoppingCartOutlined  } from "@ant-design/icons";
import { Card, Space, Statistic, Table } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


// import {data} from '../JSON data/assetsview';
import {data} from '../JSON data/dashboard';


const Pagecontent = () => {
    // const [totalAssets, setTotalAssets] = useState(0);
    // const [macAssets, setMacAssets] = useState(0);
    // const [hpAssets, setHpAssets] = useState(0);
    // const [macbookProAssets, setMacbookProAssets] = useState(0);
    // const [windows10Assets, setWindows10Assets] = useState(0);


    // useEffect(() => {
    //     const total = data.length;
    //     const mac = data.filter(asset => asset.os === 'mac').length;
    //     const hp = data.filter(asset => asset.os === 'hp').length;
    //     const macbookPro = data.filter(asset => asset.model === 'macbook pro').length;
    //     const windows10 = data.filter(asset => asset.model === 'windows 10').length;

    //     setTotalAssets(total);
    //     setMacAssets(mac);
    //     setHpAssets(hp);
    //     setMacbookProAssets(macbookPro);
    //     setWindows10Assets(windows10);
    // }, []);

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

const pieData = [
    { name: 'Phones', assets: 10 },
    { name: 'Laptops', assets: 15 },
    { name: 'Desktops', assets: 20 },
    { name: 'Printers', assets: 25 },
    { name: 'Ipads', assets: 30 },
    { name: 'Scanner', assets: 20 },
    { name: 'UPS', assets: 15 },
];

const COLORS = ['#0088FE', '#e60099', '#FFBB28', '#FF8042', '#8884D8', '#004d4d', '#88df9d'];
  

// useEffect(() => {
//     // Make API call to PHP endpoint
//     fetch('http://localhost/Api/.php')
//       .then(response => response.json())
//       .then(data => setUsers(data))
//       .catch(error => console.error('Error fetching users:', error));
//   }, []);


    return (
        <div className="Pagecontent">

            <div className='pagebox-main'>
            {/* <Space> */}
           
                <div className='pagebox'>
                <Card className="pagebox1">
                <Space direction='horizontal'>
                <LaptopOutlined className="icon out-icon2"/>
                <Statistic title="Faulty Assets" value={200} />
                
                <Statistic title="Not-Faulty" value={100} />
                </Space>
                </Card>
                <br/>

               
                <Card className="pagebox2">
                <Space direction='horizontal'>
                <TeamOutlined className="icon out-icon3"/>
                <Statistic title="Users" value={200} />
                <Statistic title="Non-Users" value={100} />
                </Space>
                </Card>
                <br/>
                

                
                <Card className="pagebox3">
                <Space direction='horizontal'>
                <TeamOutlined className="icon out-icon1"/>
                <Statistic title="Active Assets" value={200} />
                <Statistic title="Non-Active" value={100} />
                </Space>
                </Card>
                <br/>
               

               
            <Card className="pagebox4">
            <Space direction='horizontal'>
                    <ShoppingCartOutlined className="icon out-icon4"/>
                <Statistic title="All Vendors" value={200} />
                </Space> 
            </Card>
           </div>
            {/* </Space> */}
        </div>
          
  
    <Card className="chartbox">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="assets"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
    

            <Table className="assetbox"
                    dataSource={data}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />



        </div>
            );
};

export default Pagecontent;