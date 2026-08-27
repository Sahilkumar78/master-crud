import mongoose from "mongoose"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/Appointment.model.js";


// get all appointments

const getAllAppointments = asyncHandler(async () => {
       
    const appointments = await Appointment.find();

       if(appointments.length ===0){
         throw new ApiError(400, "appointments not found")
       }



    return res.
           json(new ApiResponse(200, appointments, "Appointments fetched successfully"));
})

// create appointment

const createAppointment = asyncHandler(async (req, res) => {
      
     const {patientName, doctorName, date} = req.body;
    
     if(!patientName || !doctorName || !date){
         throw new ApiError(400, "All fields are required");
     }

    const appointment=  await Appointment.create({
         patientName,
         doctorName,
         date
     })
   
    return res.
           json(new ApiResponse(201, appointment, "Appointment created Successfully"));

})

// update appointment

const updateAppointment = asyncHandler(async (req, res) => {
     const {id} = req.params;

     if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(400, "invalid id");
     }

     const {patientName, doctorName, date} = req.body;

     const updatedAppointment = await Appointment.findByIdAndUpdate(
        id, {
             patientName,
             doctorName,
             date
        },
        {
            new : true,
            runValidators: true,
        }
     )
    
      return res. 
             json(new ApiResponse(200, updatedAppointment, 
                "appointment updated successfully")); 

})

// delete appointment

const deleteAppointment = asyncHandler(async (req, res) => {
     
     const {id} = req.params;

     if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(400, "invalid id");
     }
     
     const deletedAppointment = await Appointment.findByIdAndDelete(id);
      
        if(!deletedAppointment) {
             throw new ApiError(404, "appointment not found")
        }

       return res. 
             json(new ApiResponse(200, deletedAppointment, "Appointment deleted Successfully"));
})

export {
     getAllAppointments,
     createAppointment,
     updateAppointment,
     deleteAppointment
}
