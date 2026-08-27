import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Patient } from "../models/Patient.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"

// get patient

const getPatient = asyncHandler(async (req , res) => {
     
      const allPatients=  await Patient.find();

      
      if(allPatients.length ===0){
         throw new ApiError(404, "no Patient found");
      }
      
      return res.
            json(new ApiResponse(
                200,
                allPatients,
                "Got patients successfully"
            ))

})


// add patient

const addPatient = asyncHandler(async (req,res) => {
       
    const {name, age, gender} = req.body;

    if(!name || !age || !gender){
         throw new ApiError(400, "All fields are required");
    }

    const patient = await Patient.create({
         name,
         age, 
         gender
    })

    return res.
           json(new ApiResponse(201, patient, "Patient created successfully"));

})

// update patient

const updatePatient = asyncHandler(async (req, res) => {
     
       const {id} = req.params;
      const {name, age, gender} = req.body;
       
      if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(400, "Invalid patient Id");
      }
    
    const patient= await Patient.findByIdAndUpdate(
        id,
        {
           name, 
           age, 
           gender
        },
        {
            new : true,
            runValidators: true
        }
       )

       if(!patient){
         throw new ApiError(404, "patient not found");
       }

       return res.
              json(new ApiResponse(200, patient, "patient updated successfully"));
})

// delete patient
const deletePatient =asyncHandler(async (req, res) => {
     
     const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(404, "Patient id not found")
     }

    const deletedPatient= await Patient.findByIdAndDelete(id);
    
     if(!deletedPatient){
         throw new ApiError(404, "Patient not found");
     }

    return res.
          json(new ApiResponse(200, deletedPatient, "patient deleted successfully"));
})


export {
     getPatient,
     addPatient,
     updatePatient,
     deletePatient
}