import React from "react";
import {Modal} from 'antd';

import "../dashboard.css";


 function Userassetinfo ({openModal, onModalClose, row}){
    console.log("row", row);
    console.log("SelectedRow:", row);
    return (
        <div classname="modal">
        <Modal
        open={openModal}
        title="CUSTODIAN DETAILS"
        // onOk={handleOk}
        onCancel={onModalClose}

        >
            <div className="userassetinfo">
                <p> <span>Employee Name: </span>{row?.name}</p>
                <p> <span>Asset_Type: </span>{row?.model}</p>
                <p> <span>Serial_no: </span>{row?.serial_no}</p>
                <p> <span>AssetStatus: </span>{row?.assetstatus}</p>
      <div className="images_container" >
      {row?.images.length && row?.images.map((item)=> <img src={item} alt="asset image" 
                className="modalimage"/>)}
      </div>
            </div>
        
      </Modal>
      </div>
    );
    
};
export default Userassetinfo;