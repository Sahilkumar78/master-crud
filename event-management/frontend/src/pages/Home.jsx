
import React, { useEffect, useState } from "react"
import "./Home.css"


const Home= () => {
     
    const [title , setTitle] = useState("");
    const [date, setDate] = useState("");
    const [reminder, setReminder] = useState();
    const [editId, seteditId] = useState(null)

    const [events, setEvents] = useState([]); 
    

    const getAllEvents= async () => {
        
          try {

            const res = await fetch("http://localhost:8000/api/v1/event");
             
            console.log(res);
            if(!res.ok){
               throw new Error("failed to fetch event api");
            }

            const data = await res.json();
            console.log(data.data);
            setEvents(data.data);
            
            
          } catch (error) {
            console.log("Error while fetching events: ", error);
            
          }
           
    }

  
    useEffect(() => {
       
        getAllEvents();
    }, [])

   // create/ update

   const handleSubmit =async (e) => {
          
    e.preventDefault();

    const eventData= {
       title,
       date,
       reminder
    }

       try {
          
          let res;

          if(editId){ // update
             
           res = await fetch(`http://localhost:8000/api/v1/event/updateevent/${editId}`, 
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(eventData)
            }
           )

          }else{ // create
             res = await fetch("http://localhost:8000/api/v1/event/createevent",
              {
                method: "POST",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(eventData)
              }
             )
          }

          if(!res.ok){
             throw new Error("Failed to save data");
          }
         
          const data = await res.json(); // res is always in string so convert it into json

          console.log("Backend response: ", data);
          
          setTitle("");
          setDate("");
          setReminder("");
          seteditId(null);

          // get all latest events
          getAllEvents();

       } catch (error) {
          console.log("Error while updating/creating the event: ", error);
          
       }
         
   }

   // delete event

  const handleDelete = async (id) => {
         try {
          
         const res = await fetch(`http://localhost:8000/api/v1/event/deleteevent/${id}`,
          {
            method: "DELETE"
          }
         )

         if(!res.ok){
           throw new Error("Failed to delete event");
         }

         const data = await res.json();
         console.log("Delete response is: ", data);
         
         // refresh event list
         getAllEvents();

         } catch (error) {
            console.log("Error while deleting event is: ", error);
            
         }
  }

    
     return (
        <>
         <h1>this is home page</h1>
           
      {
         events.map((event, idx) => {
              return (
               <div key={event._id}
                 className="events"
               >
                 <h1>title is: {event.title}</h1>
                 <h1>date is: {event.date}</h1>
                 <h1>reminder is: {event.reminder}</h1>

               </div>
              )
         })
      }

        </>
     )
}

export default Home