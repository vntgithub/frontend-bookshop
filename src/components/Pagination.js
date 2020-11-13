import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";

import './style/pagination.css';
const Pagination = (props) => {
    const [range, setRange] = useState({begin: 0, end: 5});
    const pagination = [];
    const changePage = (pageNumber) => {
        return function() {
            props.setpage(pageNumber);
            window.scrollTo(0, 0);
        }
    }
    const left = () => {
        if(range.begin == 0)
            return;
        setRange({begin: (range.begin-5), end: (range.end - 5)});
    }
    const right = () => {
        if(range.end == pagination.length)
            return;
        setRange({begin: (range.begin + 5), end: (range.end + 5)})
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
                {pagination.slice(range.begin, range.end)}
                <button className="buttonChangePape" onClick={right}>&gt;&gt;</button>
            </div>
        </Row>
    );
}

export default Pagination;