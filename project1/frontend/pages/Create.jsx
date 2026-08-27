import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const navigate = useNavigate();
    
    const handleSubmit= async (e) => {
        //    console.log(e.target.value);

        try {
            
         e.preventDefault();

           await axios.post("http://localhost:5001/api/notes", {
             title, content
           })
           
           navigate("/");

        } catch (error) {
            console.log("error while creating note: ",error);
            
        }
           
    }


     
    return (
         <>
          <h1>Create Page</h1>
          <form onSubmit={handleSubmit}>

           <input type="text"
             value= {title}
             placeholder="Enter the value"
             onChange={(e) => setTitle(e.target.value)}
           />

           <textarea 
            placeholder="Enter the content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
           >

           </textarea>

             <button type="submit">create</button>
          </form>

         </>
    )
}

export {Create}