import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-light text-black p-4",
  children
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron text-black bg-light text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-light mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>if you got any questions, feel free to reach out</h4>
          <button className="btn btn-warning btn-lg">Contact us</button>
        </div>
        <div className="container text-center">
          <span className="text-muted">Made by - Swapnadeep Mohapatra</span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
