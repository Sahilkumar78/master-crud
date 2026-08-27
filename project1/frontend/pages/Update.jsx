import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const Update = () => {
 const navigate = useNavigate();
  const {id} = useParams();
  console.log(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
   
     const handleSubmit= async (e) => {
       
       try {
         
         e.preventDefault();
         const res= await axios.put(`http://localhost:5001/api/notes/${id}`, {
          title, content
         }); 
         console.log(res.data);
         
        setTitle(res.data.title);
        setContent(res.data.content);

        navigate("/")
      
       } catch (error) {
        console.log("error while getting note", error);
        
       }
     }
       
  
  

       return (
         <>
           <h1>Update page</h1>

           <form onSubmit={handleSubmit}>

           <input type="text"
           placeholder="enter new text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
           />

           <textarea 
             placeholder="enter the new content"
             value={content}
             onChange={(e) => setContent(e.target.value)}
           ></textarea>
            
             <button type="submit">update</button>
              
           </form>

         </>
       )
}

export {Update}