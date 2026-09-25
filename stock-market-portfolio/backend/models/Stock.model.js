import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
     
     company: {
         type: String,
         required: true,
     },

     description:{
         type: String,
         required: true,
     },

     initialPrice: {
         type:Number,
         required: true,
     },

}, {timestamps: true});

const Stock = mongoose.model('Stock', stockSchema);

export {Stock}