import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// getDoctors

const getAllDoctors = asyncHandler(async (req , res) => {
     
     const doctors = await Doctor.find();

     if(doctors.length ===0) throw new ApiError(404, "doctors not found");

     return res.
           json(new ApiResponse(200, doctors, "All doctors fetched"));

})

// create doctor

const createDoctor = asyncHandler(async (req , res) => {
      
       const {name, speciality} = req.body;

       if(!name || !speciality) throw new ApiError(400, "All fields are required")
      
       const doctor = await Doctor.create({
         name,
         speciality
       })
       
       return res. 
              json(new ApiResponse(201, doctor, "Doctor created successfully"));
})

// update doctor

const updateDoctor = asyncHandler(async (req, res) => {
     
        const {id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
             throw new ApiError(400, "invalid id");
        }

        const {name, speciality} = req.body;

        const updatedDoctor= await Doctor.findByIdAndUpdate(id,
            {
                 name,
                 speciality
            },{
                 new: true,
                 runValidators: true,
            }
        )

        if(!updatedDoctor){
             throw new ApiError(404, "doctor not found");
        }

        return res.
               json(new ApiResponse(200, updateDoctor, "Doctor updated successfully"));
})

// delete doctor

const deleteDoctor =asyncHandler(async (req, res) => {
     
     const {id} = req.params;

     if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(400, "invalid id");
     }
    
     const deletedDoctor = await Doctor.findByIdAndDelete(id);

     if(!deletedDoctor) throw new ApiError(404, "Doctor not found");
       

     return res. 
           json(new ApiResponse(200, deletedDoctor, "doctor deleted successfully"));

})


export {
    getAllDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
};