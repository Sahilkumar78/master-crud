import React from "react";
import "./Navbar.css"


const Navbar  = () => {
     
     return (
        <div className="container">
         <div className="left">
            <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4UwqZRgaVbTj7vnIuIey8cwCVE00smUH6m3LtEqWqzA&s=10" 
            alt="" />
         </div>
         
         <div className="right">
           
            <p>Home</p>
            <p>Contact Us</p>
            <p>Gallery</p>
            <p>About us</p>

         </div>         
        </div>
     )
}

export default Navbar