import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Card.css"
import axios from "axios"

const Card = () => {

    const [title, setTitle] = useState();
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    useEffect(() =>{
         async function getNotes(){
             
            const res=  await axios.get("http://localhost:5001/api/notes")
             console.log("res is:" , res);
             
            setNotes(res.data) 
        }

        getNotes()
    }, [])

    console.log("notes are: " ,notes);
    
    const handleDelete = async (id) => {
         
          try {
            const res= await axios.delete(`http://localhost:5001/api/notes/${id}`)
             console.log(res.data);

             setNotes((prev) => prev.filter((note) => note.id !== id))
             
          } catch (error) {
            console.log("error while deleting note is: ", error);
            
          }
    }
     
     return (
         <div className="card">
            {/* <h1>This is card</h1>
            <h1>title</h1>
            <button id="update">update</button>
            <button id="delete">delete</button> */}

             {
                notes.length >0 && notes.map((note) => (
                    <div key={note._id}>
                       <h2>{note.title}</h2> 
                       <p>{note.content}</p>
                      <button  id="update"
                       onClick={() => navigate(`/update/${note._id}`)}
                      >update</button>
                      <button
                       onClick={() => handleDelete(note._id)}
                      id="delete">delete</button>
                    </div> 
                ))
             }

         </div>
     )
}

export {Card};