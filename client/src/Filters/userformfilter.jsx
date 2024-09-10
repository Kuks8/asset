import React, {useState} from "react";
import {Button, Flex, Modal} from "antd";

import "../dashboard.css";

export const Userformfilter = ({openModal, onModalClose}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOk = () => {
        setLoading(true);
        setTimeout(() =>{
            setLoading(false);
            setOpen(false);
        },3000);
    };


    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [ecard, setEcard] = useState("");
    const [hiredate, setHiredate] = useState("");
    const [department, setDepartment] = useState("");

    return (
        <Modal
        open={openModal}
        title="CUSTODIAN FORM"
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
            <form class="modal-content">
          <p>Employee Information</p>

          <div className="input_text">
            <input
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              type="fname"
              placeholder="fname"
              id="fname"
              name="fname"
              className="fname"
            />
          </div>

          <div className="input_text">
            <input
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              type="lname"
              placeholder="lname"
              id="lname"
              name="lname"
              className="lname"
            />
          </div>

          <div className="input_text">
            <input
              value={ecard}
              onChange={(e) => setEcard(e.target.value)}
              type="ecard"
              placeholder="ecard"
              id="ecard"
              name="ecard"
              className="ecard"
            />
          </div>

          <div className="input_text">
            <input
              value={hiredate}
              onChange={(e) => setHiredate(e.target.value)}
              type="hiredate"
              placeholder="hiredate"
              id="hiredate"
              name="hiredate"
              className="hiredate"
            />
          </div>

          <div className="input_text">
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              type="department"
              placeholder="department"
              id="department"
              name="department"
              className="department"
            />
          </div>
        </form>
      </Modal>
    );
  
};
export default Userformfilter;