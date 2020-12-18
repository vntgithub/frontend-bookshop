import React, { useEffect, useState } from 'react';
import { Row, Col, Input } from 'reactstrap';
import classNames from 'classnames';

import bookApi from "../api/book.api";
import userApi from '../api/user.api';
import invoiceApi from "../api/invoice.api";

import { RangePageContext, TableDataContext, isOpenDelModalContext } from "../contexts/Context";

import AdminTable from '../components/AdminTable';
import Pagination from '../components/Pagination';
import ModalUpdateBook from '../components/ModalUpdateBook';
import Mess from '../components/Mess';
import DelModal from '../components/DelModal';
import { isOpenModalUpdateBook } from '../contexts/Context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import './style/Admin.css';

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [bookUpdate, setBookUpdate] = useState({name: ''});
    const [idDel, setIdDel] = useState('');
    const [indexBookUpdate, setIndexBookUpdate] = useState(null);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataType, setDataType] = useState('Books'); //book, user, invoice
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(1);
    const [range, setRange] = useState({begin: 0, end: 5});
    const [mess, setMess] = useState('');
    const [isopenMess, setIsOpenMess] = useState(false);
    const [isOpenDelModal, setIsOpenDelModal] = useState(false);
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
    const openMUD = (item, index) => {
        return () => {
            const data = {...item};
            setBookUpdate(data);
            setIndexBookUpdate(index);
            setOpenModalUpdate(true);
        }
    }
    useEffect(() => {
        setCurrentPage(0);
        setRange({begin: 0, end: 5});
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
            setData([]);
            setDataType(datatype);
        }
    }
    const input = (event) => {
        if(event.keyCode === 13){
            const str = event.target.value;
            switch(dataType){
                case 'Books': 
                    bookApi.search(str, 0, setData).then(n => setPage(n));
                    break;
                case 'Users':
                    userApi.search(str, setData).then(n => setPage(n));
                    break;
                case 'Invoices':
                    invoiceApi.search(str, setData).then(() =>{setPage(1)});
                    break;
                default: break;
            }
        }
    }
    const openMess = (m) => {
        setMess(m);
        setIsOpenMess(true)
        setTimeout(() => setIsOpenMess(false),1500);
        console.log("done");
    }
    const openDelModal = (id) =>{ 
        return () => {
            setIdDel(id);
            setIsOpenDelModal(true);
        }
    };
    const closeDelModal = () => setIsOpenDelModal(false);
    return(
        <div className="admin-wrapper">
            {isOpenDelModal && <DelModal 
                                openDelModal={openDelModal} 
                                dataType={dataType} id={idDel} 
                                closeDelModal={closeDelModal}
                                openMess={openMess}
                                />}
            {isopenMess && <Mess mess={mess} setIsOpenMess={setIsOpenMess}/>}
            {openModalUpdate && <ModalUpdateBook 
                                    bookUpdate={bookUpdate} 
                                    close={setOpenModalUpdate}
                                    dataObj={{data, setData, indexBookUpdate}}
                                    openMess={openMess}
                                    />}
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
                    <isOpenDelModalContext.Provider value={openDelModal}>
                    <isOpenModalUpdateBook.Provider value={openMUD}>
                    <TableDataContext.Provider value={{data, dataType}}>
                        <AdminTable />
                    </TableDataContext.Provider>
                    </isOpenModalUpdateBook.Provider>
                    </isOpenDelModalContext.Provider>
                    <RangePageContext.Provider value={{ range, setRange }}>
                         <Pagination numpage={page} currentPage={currentPage} setpage={setCurrentPage}/>
                    </RangePageContext.Provider>        
                </Col>
            </Row>
            
        </div>
        
        
    );
}

export default AdminPage;