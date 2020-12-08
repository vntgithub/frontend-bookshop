import React from 'react';
import { Table } from 'reactstrap';

const AdminTable = (props) => {
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
        {props.data.map((item, index) => 
          <tr key={index}>
            <th>{index + 1}</th>
            <td>
              <img 
                src={item.urlimg} 
                alt="img-product"
                style={{width: "20%", height: "30%"}}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.author}</td>
            <td>{item.categogy}</td>
            <td>{item.price}</td>
            <td>edit</td>
            <td>del</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default AdminTable;