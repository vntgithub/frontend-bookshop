import React from "react";
import { Row } from "reactstrap";

import "./style/categogies.css";

const Categogies = (props) => {
    return (
        <div className="pt-3 boder-categogies">
            <Row className="title">Filter by Categogies</Row>
            {props.categogiesState.categogies.map((item, index) => 
                <Row className="categogies-item" key={index}>
                    <a href="/#" onClick={() => 
                        {props.categogiesState.setPageCategogies(item)}}
                    >
                        {item}
                    </a>
                </Row>
            )}
        </div>
    );
}

export default Categogies;