import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
     
    return (
         <div className="flex items-center justify-center mt-10 gap-10 ">
          
          <Link to="/appointment">
           <p className="cursor-pointer">Appointments</p>
          </Link>
           
           <Link to="/doctors">
            <p className="cursor-pointer">Doctors</p>
           </Link>

           <Link to="/patient">
             <p className="cursor-pointer">Patients</p>
           </Link>
         </div>
    )
}

export default Navbar;