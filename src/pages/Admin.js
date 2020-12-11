import React, { useEffect, useState } from 'react';
import { Row, Col, Input } from 'reactstrap';
import classNames from 'classnames';

import bookApi from "../api/book.api";
import userApi from '../api/user.api';
import invoiceApi from "../api/invoice.api";

import { RangePageContext, TableDataContext } from "../contexts/Context";

import AdminTable from '../components/AdminTable';
import Pagination from '../components/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import './style/Admin.css';

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState('Books'); //book, user, invoice
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(1);
    const [range, setRange] = useState({begin: 0, end: 5});
    //const [searchData, setSearchData] = useState('');
    const loadDataBooks = async () => {
        await bookApi.getBooks(currentPage, setData);
        await bookApi.countPageByCategogies('All books', setPage);
    }
    const loadDataUsers = async () => {
        await userApi.getUsersPerPage(currentPage, setData);
        await userApi.countUsers(setPage);
    }
    const loadDataInvoices = async () => {
        await invoiceApi.getPerPage(currentPage, setData);
        await invoiceApi.count(setPage);
    }
    useEffect(() => {
        setCurrentPage(0);
        setRange({begin: 0, end: 5});
        setData([]);
        switch(dataType){
            case 'Books': loadDataBooks(); break;
            case 'Users': loadDataUsers(); break;
            case 'Invoices': loadDataInvoices(); break;
            default: break;
        }
        
    }, [dataType]); 
    useEffect(() => {
        
        const changePage = async () => {
            switch(dataType) {
                case 'Books': await bookApi.getBooks(currentPage, setData); break;
                case 'Users': await userApi.getUsersPerPage(currentPage, setData); break;
                case 'Invoices': await invoiceApi.getPerPage(currentPage, setData); break;
                default: break;
            }
        }
        changePage();
    }, [currentPage]);
    const changeDataType = (datatype) => {
        return () => {
            setDataType(datatype);
        }
    }
    const input = (event) => {
        if(event.keyCode === 13){
            bookApi.search(event.target.value, 0, setData).then(n => setPage(n));
        }
    }
    const height = document.getElementById('root').clientHeight < 790;

    return(
        <div className="admin-wrapper">
            <Row>
                <Col md={2} className="dashboard pl-5">
                    <h2>Menu</h2>
                    <ul>

                        <li 
                            className={classNames({activeaaa: dataType === 'Books'})}
                            onClick={changeDataType('Books')}
                        >
                            <FontAwesomeIcon icon={faBook} className="mr-2" />
                            Books
                        </li>
                        <li
                            className={classNames({activeaaa: dataType === 'Users'})}
                            onClick={changeDataType('Users')}
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Users  
                        </li>
                        <li
                            className={classNames({activeaaa: dataType === 'Invoices'})}
                            onClick={changeDataType('Invoices')}
                        >
                            <FontAwesomeIcon icon={faFileInvoice} className="mr-2" />
                            Invoices
                        </li>
                    </ul>
                </Col>
                <Col md={10} className="pl-1 right-col">
                    <h2>{dataType} manager</h2>
                    <Input  
                        type="text" 
                        className="searchInAdminpage" 
                        placeholder="Search..."
                        onKeyDown={input}
                        />
                    <TableDataContext.Provider value={{data, dataType}}>
                        <AdminTable />
                    </TableDataContext.Provider>
                    <RangePageContext.Provider value={{ range, setRange }}>
                         <Pagination numpage={page} currentPage={currentPage} setpage={setCurrentPage}/>
                    </RangePageContext.Provider>        
                </Col>
            </Row>
            { height && <div style={{height: "300px"}}></div>}
        </div>
        
    );
}

export default AdminPage;