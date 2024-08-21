import React from "react";
import {Modal, Button} from 'antd';

import '../dashboard.css';

const Assetsort =({openModal, onModalClose, onSort}) =>{


    return (
        <Modal
        open={openModal}
        onCancel={onModalClose}
        >
            <div className="sortmodal">
            <ul>
                <li onClick={() => onSort('newest')}> Newest</li>
                <li onClick={() => onSort('oldest')}> Oldest</li>
                <li onClick={() => onSort('ascending')}> Ascending</li>
                <li onClick={() => onSort('descending')}> Descending</li>
            </ul>
            </div>
        </Modal>

    );
};
export default Assetsort;