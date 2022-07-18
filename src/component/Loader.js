import React from "react";
import loader from "../assets/image/loading.gif";

const Loader = () => {
  return (
    <div className="text-center">
      <img className="my-4" src={loader} alt="Loader" />
    </div>
  );
};

export default Loader;
