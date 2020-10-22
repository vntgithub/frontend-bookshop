import React from "react";

import banner from "../img/banner.jpg";

const Banner = (props) => {
  return (
    <div className="container-fluid">
      <img src={banner} alt="banner" width="100%" />
    </div>
  );
};

export default Banner;
