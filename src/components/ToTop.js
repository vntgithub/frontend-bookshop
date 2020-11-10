import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

import './style/ToTop.css';
const ToTop = () => {
    const click = () => window.scrollTo(0, 0);
    return(
        <div onClick={click} className="totop">
            <FontAwesomeIcon icon={faAngleUp} />
        </div>
    );
}

export default ToTop;