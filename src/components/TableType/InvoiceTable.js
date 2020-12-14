import React from 'react';
import { useContext } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TableDataContext } from '../../contexts/Context';

const InvoiceTable = () => {
    const { data } = useContext(TableDataContext);
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phonenumbers</th>
                    <th>Date</th>
                    <th>Cart</th>
                    <th>Total amount</th>
                    <th>State</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody className="justify-content-center text-align-center">
                {data.map((item, index) =>
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td className="name-intable">{item.name}</td>
                    <td className="author-intable">{item.address}</td>
                    <td className="author-intable">{item.phonenumber}</td>
                    <td className="date">{item.date}</td>
                    <td>
                        {/* {item.cart} */}
                    </td>
                    <td className="price">{item.totalamount} $</td>
                    <td className={classNames(
                        'state-in-table',
                        {'state-done': item.state === 'Done'},
                        {'state-waitting': item.state === 'Waitting'},
                        {'state-cancel': item.state === 'Cancel'},
                        {'state-delivering': item.state === 'Delivering'}
                    )}>
                        {item.state}
                    </td>
                    <td>
                        <FontAwesomeIcon className="ml-3 iconInTable" icon={faTrash} />
                    </td>
                 </tr>)}
            </tbody>
    </Table>
    )
}

export default InvoiceTable;