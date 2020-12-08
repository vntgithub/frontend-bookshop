import React, { useEffect, useState } from 'react';
import { Row, Col, Input } from 'reactstrap';

import bookApi from "../api/book.api";

import { RangePageContext } from "../contexts/Context";

import AdminTable from '../components/AdminTable';
import Pagination from '../components/Pagination';

import './style/Admin.css';

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState('book');
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(0);
    const [range, setRange] = useState({begin: 0, end: 5});
    useEffect(() => {
        const loadData = async () => {
            await bookApi.getBooks(currentPage, setData);
            await bookApi.countPageByCategogies('All books', setPage);
        }
        loadData();
    }, []); 
    useEffect(() => {
        const changePage = async () => {
            await bookApi.getBooks(currentPage, setData);
        }
        changePage();
    }, [currentPage])
    return(
        <div className="admin-wrapper">
            <Row>
                <Col md={2} className="dashboard pl-5">
                    <h2>Menu</h2>
                    <ul>
                        <li>Books</li>
                        <li>Users</li>
                        <li>Invoices</li>
                    </ul>
                </Col>
                <Col md={10} className="pl-1">
                    <h2>Book manager</h2>
                    
                    <AdminTable data={data} />
                    <RangePageContext.Provider value={{ range, setRange }}>
                         <Pagination numpage={page} currentPage={currentPage} setpage={setCurrentPage}/>
                    </RangePageContext.Provider>        
                </Col>
            </Row>
        </div>
    );
}

export default AdminPage;