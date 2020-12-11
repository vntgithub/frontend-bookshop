import React from 'react';
import { useContext } from 'react';
import { TableDataContext } from '../contexts/Context';

import BookTable from './TableType/BookTable';
import UserTable from './TableType/UserTable';
import InvoiceTable from './TableType/InvoiceTable';

import './style/AdminTable.css';


const AdminTable = () => {
  const { dataType } = useContext(TableDataContext);
  
  switch(dataType) {
    case 'Books': return <BookTable />;
    case 'Users': return <UserTable />; 
    default: return <InvoiceTable />;
  }
}

export default AdminTable;