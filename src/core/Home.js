import React from "react";
import "../styles.css";
import Base from "./Base";

function Home() {
  // console.log("API IS ", API);

  return (
    <div>
      <Base title="Home Page" description="Welcome to e-commerce">
        <div className="row"></div>
      </Base>
    </div>
  );
}

export default Home;
