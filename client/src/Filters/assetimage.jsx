import React from "react";
import {Modal} from 'antd';

import "../dashboard.css";


 function Assetimage ({openModal, onModalClose, row}){
    console.log("row", row);
    console.log("SelectedRow:", row);
    return (
        <div classname="modal">
        <Modal
        open={openModal}
        title="Asset Details"
        // onOk={handleOk}
        onCancel={onModalClose}

        >
            <div className="assetimage">
                <p> <span>Asset name: </span>{row?.name}</p>
                <p> <span>Asset_Type: </span>{row?.type}</p>
                <p> <span>Serial_no: </span>{row?.serial_no}</p>
                <p> <span>Softwares: </span>{row?.softwares}</p>
                <p> <span>Owner: </span>{row?.owner}</p>
                <p> <span>Assigned_by: </span>{row?.assigned_by}</p>
                <p> <span>Vendor: </span>{row?.vendor}</p>
                <p> <span>DatePurchased: </span>{row?.datepurchased}</p>
                <p> <span>Price: </span>{row?.price}</p>
                <div className="images_container" >
                {row?.images.length && row?.images.map((item)=> <img src={item} alt="asset image" 
                className="modalimage"/>)}
            </div>
            </div>

      </Modal>
      </div>
    );
    
};
export default Assetimage;






