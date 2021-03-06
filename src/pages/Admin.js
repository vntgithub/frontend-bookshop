import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';
import classNames from 'classnames';

import bookApi from "../api/book.api";
import userApi from '../api/user.api';
import invoiceApi from "../api/invoice.api";

import { RangePageContext, 
    TableDataContext, 
    isOpenDelModalContext, 
    isOpenModalAddBookContext, 
    MessContext,
    AdminContext} from "../contexts/Context";

import AdminTable from '../components/AdminTable';
import Pagination from '../components/Pagination';
import ModalUpdateBook from '../components/ModalUpdateBook';
import DelModal from '../components/DelModal';
import ModalAddBook from '../components/ModalAddBook';
import { isOpenModalUpdateBook } from '../contexts/Context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import './style/Admin.css';
import adminApi from '../api/admin.api';

const AdminPage = () => {
    const index = document.cookie.indexOf('idadmin');
    const { setAdmin } = useContext(AdminContext);
    if(index === -1){
        window.location.replace('/loginadmin');
    }
    const openMess = useContext(MessContext);
    const [data, setData] = useState([]);
    const [isOpenModalAddBook, setIsOpenModalAddBook] = useState(false);
    const [bookUpdate, setBookUpdate] = useState({name: ''});
    const [idDel, setIdDel] = useState('');
    const [indexDel, setIndexDel] = useState(null);
    const [indexBookUpdate, setIndexBookUpdate] = useState(null);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataType, setDataType] = useState('Books'); //book, user, invoice
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(1);
    const [range, setRange] = useState({begin: 0, end: 5});
    
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
        const arrCookie = document.cookie.split(';');
        const adminStrCookie = arrCookie.find(e => e.substr(0,7) === 'idadmin');
        const cookie = adminStrCookie.substr(8);
        const getAdminbyCookie = async () => {
            await adminApi.getByCookie(cookie, setAdmin);
        }
        getAdminbyCookie();
    }, [])
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
                if(str === ''){
                    loadDataBooks();
                }else{
                    bookApi.search(str, 0, setData);
                    bookApi.countPageBySearchString(str, setPage);
                }
                    break;
                case 'Users':
                    if(str === ''){
                        loadDataUsers();
                    }else{
                        userApi.search(str, setData).then(n => setPage(n));
                    }
                    break;
                case 'Invoices':
                    if(str === ''){
                        loadDataInvoices();
                    }else{
                        invoiceApi.findByName(str, setData).then(n =>{setPage(n)});
                    }
                    break;
                default: break;
            }
            setCurrentPage(0);
        }
    }
    
    const openDelModal = (id, index) =>{ 
        return () => {
            setIndexDel(index);
            setIdDel(id);
            setIsOpenDelModal(true);
        }
    };
    const closeDelModal = () => setIsOpenDelModal(false);
    const closeModalAddBook = () => setIsOpenModalAddBook(false);
    const openModalAddBook = () => setIsOpenModalAddBook(true);
    const filterState = (e) => {
        console.log(e.target.value);
        if(e.target.value === 'All'){
            loadDataInvoices();
            return;
        }else{
            setCurrentPage(0);
            invoiceApi.getAllByState(0, e.target.value, setData ).then(n => setPage(n));
        }
    }
    return(
        <div className="admin-wrapper">
            {isOpenModalAddBook && <ModalAddBook 
                                    closeModalAddBook={closeModalAddBook} 
                                    openMess={openMess} 
                                    dataObj={{data, setData}}
                                    />}
            {isOpenDelModal && <DelModal 
                                openDelModal={openDelModal} 
                                dataType={dataType} id={idDel} 
                                closeDelModal={closeDelModal}
                                openMess={openMess}
                                dataObj={{data, indexDel}}
                                />}
            
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
                <Col md={{size: 10, offset: 2}} className="pl-5 right-col">
                    <h2>{dataType} manager</h2>
                    <div className="input-button-admin">
                    <Input  
                        type="text" 
                        className="searchInAdminpage" 
                        placeholder="Search..."
                        onKeyDown={input}
                        />
                    {dataType==='Books' && <Button className="addbook" onClick={openModalAddBook}>Add book</Button>}
                    {dataType==='Invoices' && <Input className="filter-state-admin" type="select" onChange={filterState}>
                        <option>All</option>
                        <option>Done</option>
                        <option>Delivering</option>
                        <option>Waitting</option>
                        <option>Cancel</option>
                    </Input>}
                    </div>
                    <isOpenModalAddBookContext.Provider value={openModalAddBook}>
                    <isOpenDelModalContext.Provider value={openDelModal}>
                    <isOpenModalUpdateBook.Provider value={openMUD}>
                    <TableDataContext.Provider value={{data, dataType, setData}}>
                        <AdminTable />
                    </TableDataContext.Provider>
                    </isOpenModalUpdateBook.Provider>
                    </isOpenDelModalContext.Provider>
                    </isOpenModalAddBookContext.Provider>
                    <RangePageContext.Provider value={{ range, setRange }}>
                         <Pagination numpage={page} currentPage={currentPage} setpage={setCurrentPage}/>
                    </RangePageContext.Provider>        
                </Col>
            </Row>
            
        </div>
        
        
    );
}

export default AdminPage;