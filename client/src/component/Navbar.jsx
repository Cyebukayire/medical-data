/*@author: Peace Cyebukayire
 * created: 19th Aug 2022*/

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("usertype");
    navigate("/");
  };
  return (
    <>
      <div onClick={logout} className="navbar">
        <p>Logout</p>
      </div>
    </>
  );
};

export default Navbar;
