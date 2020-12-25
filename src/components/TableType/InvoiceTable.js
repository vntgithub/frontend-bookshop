import React from 'react';
import { useContext } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TableDataContext } from '../../contexts/Context';
import invoiceApi from '../../api/invoice.api';

const InvoiceTable = () => {
    const { data, setData } = useContext(TableDataContext);
    const toNextState = (id, state, index) => {
        return () => {
            switch(state){
                case 'Waitting':
                    invoiceApi.updateState(id, 'Delivering').then(() => {
                        let newData = [...data];
                        newData[index] = {...newData[index], state: 'Delivering'};
                        setData(newData);

                    });
                    break;
                case 'Delivering':
                    invoiceApi.updateState(id, 'Done').then(() => {
                        let newData = [...data];
                        newData[index] = {...newData[index], state: 'Done'};
                        setData(newData);
                    });
                    break;
                default:
                    invoiceApi.updateState(id, 'Cancel').then(() => {
                        let newData = [...data];
                        newData[index] = {...newData[index], state: 'Cancel'};
                        setData(newData);
                    });
                    break;
            }
        }
    }
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
                    <th>Next state</th>
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
                    <td className="cart-list">
                        <ul>
                        {
                            
                            item.cart.map((book, index) => 
                            <li key={index}>
                                {book.item.name}: {book.count}
                            </li>)
                        }
                        </ul>
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
                        <FontAwesomeIcon 
                            className="icon-nextState" 
                            icon={faAngleRight} 
                            onClick={toNextState(item['_id'], item.state, index)}
                            />
                    </td>
                 </tr>)}
            </tbody>
    </Table>
    )
}

export default InvoiceTable;