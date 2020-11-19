import React, { useContext } from "react";
import classNames from 'classnames';
import { Row } from "reactstrap";

import './style/pagination.css';
import { RangePageContext } from "../contexts/Context";
const Pagination = (props) => {
    const { range, setRange } = useContext(RangePageContext);
    const pagination = [];
    const changePage = (pageNumber) => {
        return function() {
            props.setpage(pageNumber);
            window.scrollTo(0, 0);
        }
    }
    const left = () => {
        if(range.begin === 0)
            return;
        setRange({begin: (range.begin-5), end: (range.end - 5)});
    }
    const right = () => {
        if(range.end >= pagination.length - 1)
            return;
        setRange({begin: (range.begin + 5), end: (range.end + 5)})
    }
    for(let i = 0; i < props.numpage; i++){
        pagination.push(
            <button className={classNames('buttonChangePape', {'active': props.currentPage === i})} 
                    onClick={changePage(i)}
                    key={i}
            >
                {i+1}
            </button>
            );
    }

    return (
        <Row className="justify-content-center m-3">
            <div>
                <button className="buttonChangePape" onClick={left}>&lt;&lt;</button>
                {pagination.slice(range.begin, range.end)}
                <button className="buttonChangePape" onClick={right}>&gt;&gt;</button>
            </div>
        </Row>
    );
}

export default Pagination;