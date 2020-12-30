import React from 'react';
import { useContext } from 'react';
import { Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { isOpenDelModalContext, TableDataContext } from '../../contexts/Context';

const UserTable = () => {
    const { data } = useContext(TableDataContext);
    const openDelModal = useContext(isOpenDelModalContext);
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Img</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phonenumbers</th>
                    <th>Username</th>
                    <th>Del</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) =>
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                        <img 
                        src={item.urlimg} 
                        alt="img-product"
                        style={{borderRadius: "50%", width: "50px", height: "50px"}}
                        />
                    </td>
                    <td className="name-intable">{item.name}</td>
                    <td className="author-intable">{item.address}</td>
                    <td className="author-intable">{item.phonenumber}</td>
                    <td className="price">{item.username}</td>
                    <td>
                        <FontAwesomeIcon 
                            icon={faTrash} 
                            className="iconInTable"
                            onClick={openDelModal(item['_id'], index)}
                            />
                    </td>
                 </tr>)}
            </tbody>
    </Table>
    )
}

export default UserTable;