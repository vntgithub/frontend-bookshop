import React from 'react';
import { useContext } from 'react';
import { Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { TableDataContext } from '../../contexts/Context';

const BookTable = (props) => {
    const { data } = useContext(TableDataContext)
    return (
        <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>Img</th>
                <th>Name</th>
                <th>Author</th>
                <th>Categogy</th>
                <th>Price</th>
                <th>Edit</th>
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
                        style={{width: "65px", height: "105px"}}
                        />
                    </td>
                    <td className="name-intable">{item.name}</td>
                    <td className="author-intable">{item.author}</td>
                    <td className="categogy">{item.categogy}</td>
                    <td className="price">{item.price}</td>
                    <td>
                        <FontAwesomeIcon icon={faEdit} className="iconInTable" />
                    </td>
                    <td>
                        <FontAwesomeIcon icon={faTrash} className="iconInTable" />
                    </td>
                 </tr>)}
            </tbody>
    </Table>
    )
}

export default BookTable;