import React from "react";
import { Row } from "reactstrap";

import './style/pagination.css';
const Pagination = (props) => {
    const pagination = [];
    const changePage = (pageNumber) => {
        return function() {
            props.setpage(pageNumber);
            //window.scrollTo(0, 0);
        }
    }
    const left = () => {
        
    }
    const right = () => {

    }
    for(let i = 0; i < props.numpage; i++){
        pagination.push(
            <button className="buttonChangePape" 
                    onClick={changePage(i)}
                    key={i}
            >
                {i+1}
            </button>
            );
    }
    return (
        <Row className="justify-content-center">
            <div>
                <button className="buttonChangePape" onClick={left}>&lt;&lt;</button>
                {pagination}
                <button className="buttonChangePape" onClick={right}>&gt;&gt;</button>
            </div>
        </Row>
    );
}

export default Pagination;