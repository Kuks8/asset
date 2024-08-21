import React from "react";
import {Modal, Button} from 'antd';

import '../dashboard.css';

const Usersort =({openModal, onModalClose}) =>{


    return (
        <Modal
        open={openModal}
        onCancel={onModalClose}
        >
            <ul>
                
                <li onClick={() => onSort('newest')}> Newest</li>
                <li onClick={() => onSort('oldest')}> Oldest</li>
                <li onClick={() => onSort('ascending')}> Ascending</li>
                <li onClick={() => onSort('descending')}> Descending</li>
            </ul>
        </Modal>

    );
};
export default Usersort;