import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
     
     patientName:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Patient',
         required: true
     },

     doctorName: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Doctor',
         required: true
     },

     date: {
         type: Date,
          required: true
     }
}, {timestamps: true})

const Appointment = mongoose.model('Appointment', appointmentSchema);

export {Appointment}