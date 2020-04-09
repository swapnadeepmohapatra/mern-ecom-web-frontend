import React from "react";
import "../styles.css";
import { isAuthenticated } from "../auth/helper";

function NavBar() {
  return (
    <div className="header">
      <img
        style={{ height: "2rem", margin: 5,alignSelf:'center' }}
        // src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/647px-Apple_logo_black.svg.png"
        src={require('./logo.png')}
        alt=""
      />
      <div
        className="dropdown"
        style={{
          alignSelf: "center",
          marginLeft: "auto",
        }}
      >
      
    <img
          src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"
          alt=""
          height="16"
        />
        <span>Cart: </span>
        <span>2</span>

        <button className="dropbtn">
          <img
            style={{
              borderRadius: 50,
              height: "2rem",
              width: "2rem",
              marginRight: "0.5em",
            }}
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="Profile Picture"
            height="30"
          />
          <span>
            Hello, <b>{isAuthenticated().user.name}</b>
          </span>
        </button>
        <div className="dropdown-content">
          <a>My Account</a>
          <a>My Orders</a>
          <a>Sign out</a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

    // <div className="d-flex flex-sm-column justify-content-between align-items-center header">
    //   <div className="logo d-sm-none"></div>
    //   <label className="search-bar">
    //     <input
    //       type="text"
    //       placeholder="Search for awesome essentials..."
    //       className="no-border"
    //     />
    //   </label>
    //   <div className="d-flex justify-content-between align-items-center cart">
    //     <img
    //       src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"
    //       alt=""
    //       height="16"
    //     />
    //     <span>Cart: </span>
    //     <span>2</span>
    //   </div>
    //   <div className="d-flex w-sm-100">
    //     <div className="hello-name">
    //       <img
    //         src="https://pbs.twimg.com/profile_images/1239922488160575489/_Ykuf9DR_400x400.jpg"
    //         src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfFp-GLtUQdhtyuckyLDzuTk0yUCh6MkcJ635BHcl1g06-FwAZ&usqp=CAU"
    //         alt="Profile Picture"
    //         height="30"
    //       />
    //       <span>
    //         Hello, <b>Mr. Prateek</b>
    //       </span>
    //       <div className="profile-menu">
    //         <ul>
    //           <li>
    //             <a>My Account</a>
    //           </li>
    //           <li>
    //             <a>My Orders</a>
    //           </li>
    //           <li>
    //             <a>Settings</a>
    //           </li>
    //           <li>
    //             <a>Sign out</a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>