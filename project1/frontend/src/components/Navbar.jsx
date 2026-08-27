import React from "react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import "./Navbar.css"

const Navbar = () => { 

       return (
         <div className="nav">


         <Link to="/">
          <h1 >Home Page</h1>
         </Link>
       
         <Link to="/create">
          <h1 >Create Page</h1>
         </Link>
         <Link to="/update">
          <h1 >Update Page</h1>
         </Link>
         <Link to="/delete">
          <h1 >Delete Page</h1>
         </Link>
            
            <Link to="/create">
              <CiSquarePlus className="plus"/>
            </Link>
          </div>
       )
}

export {Navbar}