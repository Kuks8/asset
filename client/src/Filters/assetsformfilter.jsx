import React, { useState, useContext } from "react";
import { Button, Flex, Modal, Table, Dropdown, Menu, Input, Select} from "antd";
// import { AssetTypeContext } from './Filters/assettypecontext';

import "../dashboard.css";

 const Assetsformfilter = ({openModal, onModalClose}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const { assetTypes } = useContext(AssetTypeContext);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };



  const [asset, setAsset] = useState("");
  const [type, setType] = useState("");
  const [serial_no, setSerial_no] = useState("");
  const [model, setModel] = useState("");
  const [os, setOS] = useState("");
  const [vendor, setVendor] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  const data = [];

  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Asset Type',
      dataIndex: 'assetType',
      key: 'assetType',
    },
  ];

  

    const handleSelectChange = (value) => {
      setType(value);
    };


  const menu = (
    <Menu>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
    </Menu>
  );

  return (
  
      <Modal
        open={openModal}
        title="ADD ASSET"
        onOk={handleOk}
        onCancel={onModalClose}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
          <Button
            key="back"
            type="default"
            loading={loading}
            onClick={onModalClose}
          >
           Cancel
          </Button>,
        ]}
      >
        <form class="form-content">
          <p>Asset Information</p>

          <div className="input_text1">
            <input
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              type="serial_no"
              placeholder="serial_no"
              id="serial_no"
              name="serial_no"
              className="serial_no"
            />
          </div>

          <div className="input_text2">
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              type="name"
              placeholder="name"
              id="name"
              name="name"
              className="name"
            />
          </div>

          <div className="input_text3">
         <Select
          value={type}
          placeholder="Select asset type"
          onChange={handleSelectChange}
          dropdownRender={menu => (
      <div>
        {menu}
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
          onRow={(record) => ({
            onClick: () => handleSelectChange(record.assetType),
          })}
        />
        </div>
          )}
          >
        </Select>
          </div>

          <div className="input_text4">
            <input
              value={serial_no}
              onChange={(e) => setSerial_no(e.target.value)}
              type="date_purchased"
              placeholder="date_purchased"
              id="date_purchased"
              name="date_purchased"
              className="date_purchased"
            />
          </div>

          <div className="input_text5">
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              type="model"
              placeholder="model"
              id="model"
              name="model"
              className="model"
            />
          </div>

          <div className="input_text6">
            <input
              value={os}
              onChange={(e) => setOS(e.target.value)}
              type="os"
              placeholder="os"
              id="os"
              name="os"
              className="os"
            />
          </div>

      

          <p>Vendor Information</p>

          <div className="input_text7">
            <input
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              type="vendor"
              placeholder="vendor"
              id="vendor"
              name="vendor"
              className="vendor"
            />
          </div>

          <div className="input_text8">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="address"
              placeholder="address"
              id="address"
              name="address"
              className="address"
            />
          </div>

          <div className="input_text9">
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type="number"
              placeholder="number"
              id="number"
              name="number"
              className="number"
            />
          </div>
      
        </form>
      </Modal>
  );
};
export default Assetsformfilter;
