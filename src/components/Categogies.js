import React from "react";
import { Row } from "reactstrap";

import "./style/categogies.css";

const Categogies = (props) => {
    return (
        <div className="pt-3 boder-categogies">
            <Row className="title">Filter by Categogies</Row>
            {props.categogies.map((item, index) => 
                <Row className="categogies-item" key={index}>
                    <p onClick={() => 
                        {props.setFilter(item)}}
                    >
                        {item}
                    </p>
                </Row>
            )}
        </div>
    );
}

export default Categogies;