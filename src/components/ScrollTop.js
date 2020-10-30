import React from "react";

import './style/Scroll.css';
const ScrollTop = () => {
    const onTop = () =>{
       window.scrollTo(0,0);
    }
    return (
        <div className="goTop">
            <button onClick={onTop}>GoTop</button>
        </div>
    )
}

export default ScrollTop;