import React from "react";
import "../styles.css";
import { isAuthenticated } from "../auth/helper";
import { Link, withRouter } from "react-router-dom";

function NavBar() {
  return (
    <div className="header">
    <Link
        style={{ alignSelf:'center',marginLeft:'-25px' }} to="/main" className="nav-link">
      <img
        style={{ height: "2rem", margin: 5,alignSelf:'center' }}
        // src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/647px-Apple_logo_black.svg.png"
        src={require('./logo.png')}
        alt=""
      />
    </Link>
    <div style={{display:'flex',width:'40rem',margin:'auto',fontSize:'14px',fontWeight:300,border:'none',marginLeft:'60px',flexDirection:'row'}}>
    <input style={{width:'40rem',fontSize:'14px',fontWeight:300,border:'none'}} type="text" placeholder="Search for products, brands and more..."/>
      <button style={{backgroundColor:'#ffffff',border:'none'}} class="vh79eN" type="submit"><svg width="20" height="20" viewBox="0 0 17 18" class="" xmlns="http://www.w3.org/2000/svg"><g fill="#000000" fill-rule="evenodd"><path class="_2BhAHa" d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"></path><path class="_2BhAHa" d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"></path></g></svg>
      </button></div>
      <div
        className="cart"
        style={{
          display:'inlineBlock',
          marginRight: "auto",
          alignSelf:'center',
        }}
      >
        <Link
          className="nav-link"
          to="/cart"
          style={{color:'#000000'}}
          >
          <img
          src="https://image.flaticon.com/icons/svg/626/626443.svg"
          alt=""
          height="20"
          style={{marginRight:'5px', alignSelf:'center'}}
        />
        <span>Cart: </span>
        <span>0</span>
        </Link>
      </div>
      <div
        className="dropdown"
        style={{
          alignSelf: "center",
          marginLeft: "25px",
        }}
      >
        <button className="dropbtn">
          <img
            style={{
              borderRadius: 50,
              height: "2rem",
              width: "2rem",
              marginRight: "0.5em",
            }}
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="Profile Pic"
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

export default withRouter(NavBar);

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