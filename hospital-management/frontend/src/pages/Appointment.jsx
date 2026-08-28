
import React, { useEffect, useState } from "react";


const Appointment = () => {

  const [patientName , setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("")
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState("");
  const [editId, setEditId] = useState(null);   

  const getAllAppointments = async () => {
           
    try {
        const response = await fetch("http://localhost:8000/api/v1/appointment/")
             
        const data = await response.json();
        console.log("appointments are: ", data.data);
        setAppointments(data.data)
    } catch (error) {
        console.log("Error while getting appointments details: ", error);   
    }
    }

    useEffect(() => {
          
      getAllAppointments();
    }, [patientName, doctorName, date])

   const handleSubmit = async (e) => {
     
        e.preventDefault();

      const appointmentData = {
           patientName,
           doctorName,
           date
      }

      console.log("appointment detaila are: ", appointmentData);
      

      try {
        let response;
        
         if(editId){ // update
              response = await fetch(`http://localhost:8000/api/v1/appointment/${editId}`, 
                {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(appointmentData)
                }
              );
                
         }else{
            const response=  await fetch("http://localhost:8000/api/v1/appointment/createappointment" , 
            {
             method: "POST",
             headers: {
                 "Content-Type":"application/json"
             },
             body: JSON.stringify(appointmentData)
          })
         }

          const data = await response.json();
          console.log("Backend data", data);
        
          setDate("");
          setPatientName("");
          setDoctorName("")

      } catch (error) {
        console.log("Error while sending appointment to datanase is: ", error);
      }

   }

   const handleEdit = (appointment) => {
     
         setEditId(appointment._id);
         setPatientName(appointment.patientName);
         setDoctorName(appointment.doctorName);
         setDate(
            new Date(appointment.date)
            .toISOString()
            .split('T')[0]
         )

   }

   const handleDelete = async (id) => {
          
    try {
        
      const response= await fetch(`http://localhost:8000/api/v1/appointment/${id}`,{
            method: 'DELETE'
         });

         const data = await response.json();
         console.log("Data response: ", data);
         
         getAllAppointments();

    } catch (error) {
        console.log("Error while deleting appointment is: ", error);
        
    }
         
   }


    return (
         <div className="flex flex-col justify-center items-center mt-15 gap-10">
          <h1>Book Appointment now</h1>
            <div className="flex justify-center gap-3 items-center">
                 <p>Add Appointment</p>
                <button className="bg-blue-400 p-2 rounded-xl cursor-pointer">Create Appointment</button>
               
            </div>

            <div className="flex justify-center items-center ">
               
             <form 
             onSubmit={handleSubmit}
            className="flex flex-col justify-around items-center gap-2"
           >
             

                <div className="flex gap-10">
                <label >Patient Name</label>
                <input type="text" placeholder="Enter Appointment..."
                 className="px-15 border fit-content"
                 value={patientName}
                 onChange={(e) => setPatientName(e.target.value)}
                />
               </div>

                <div className="flex gap-10">
                <label >Doctor Name</label>
                <input type="text" placeholder="Enter Doctor name"
                 className="px-15 border fit-content"
                 value={doctorName}
                 onChange={(e) => setDoctorName(e.target.value)}
                />
               </div>
                <div className="flex  gap-10 ">
                <label >Date</label>
                <input type="text" placeholder="Enter Date"
                 className="px-7 border fit-content"
                 value={date}
                 onChange={(e) => setDate(e.target.value)}
                />
               </div>
              
              <button 
               type="submit"
              className="bg-red-500 rounded-xl p-2 px-4 cursor-pointer border-none">Submit</button>
           </form>
            
            {/* appointments */}
           <div>
            {/* <p>Appointments data will be displayed here once fetched from database</p> */}
              {
                appointments.length ===0 ? (
                <p>No appointments found</p> 
                 ) : (
                    appointments.map((appointment) => (
                        <div
                                    key={appointment._id}
                                    className="border p-4 rounded-lg"
                                >
                                    <p>
                                        <strong>
                                            Patient:
                                        </strong>{" "}
                                        {appointment.patientName}
                                    </p>
                                    <p>
                                        <strong>
                                            Doctor:
                                        </strong>{" "}
                                        {appointment.doctorName}
                                    </p>
                                    <p>
                                        <strong>
                                            Date:
                                        </strong>{" "}
                                        {new Date(
                                            appointment.date
                                        ).toLocaleDateString()}
                                    </p>

                                    {/* BUTTONS */}

                                    <div className="flex gap-3 mt-4">

                                        <button
                                            onClick={() =>
                                                handleEdit(
                                                    appointment
                                                )
                                            }
                                            className="bg-yellow-400 px-3 py-1 rounded"
                                        >
                                            Update
                                        </button>


                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    appointment._id
                                                )
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                    ))
                )
              }
           
           </div>
            </div>

         </div>
    )
}

export default Appointment