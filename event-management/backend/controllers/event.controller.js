
import { Event } from "../models/event.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import mongoose from "mongoose";

// create 

const createEvent = asyncHandler(async (req, res) => {
     
     const {title, date, reminder} = req.body;
      console.log(title);
      console.log(date);
      console.log(reminder);
      
    if(!title || !date || !reminder){
         throw new ApiError(400, "All fields are required");
    }

    const event = await Event.create({ // 200
         title,
         date,
         reminder
    })

    return res 
           .json(new ApiResponse(201, event, "Event created Successfully"));

})

// get event

const getAllEvents = asyncHandler(async (req, res) => {
     
        const allEvents = await Event.find();
         
        if(allEvents.length ===0){
             throw new ApiError(404, "no event found");
        }
         
        return res 
               .json(new ApiResponse(200, allEvents, 
                "Got Events Successfully"));

})

// get event by id

const getEventById = asyncHandler(async (req, res) => {
       
     const {id} = req.params;

     if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(404, "id is invalid");
     }

    const event=  await Event.findById(id);
       if(!event){
         throw new ApiError(404, "event not found");
       }
     
       return res 
              .json(new ApiResponse(200, event, "Got event"));

})

// update event

const updateEvent = asyncHandler(async (req, res) => {
       
      const {id} = req.params;

      if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(404, "invalid id");
      }
      
      const {title, date, reminder} = req.body; // destructuring
          
      const updatedEvent = await Event.findByIdAndUpdate(
        id, 
        {
             title,
             date,
             reminder
        },
        {
            new: true,
            runValidators: true
        }
      )

      return res 
             .json(new ApiResponse(200, updatedEvent,"Event updated successfully" ));

})

// delete event

const deleteEvent = asyncHandler(async (req, res) => {
     
     const {id} = req.params;

     if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(404, "invalid id");
     }

     const deletedEvent= await Event.findByIdAndDelete(id);

      if(!deletedEvent){
         throw new ApiError(404, "event not found");
      }

      return res
             .json(new ApiResponse(200, deletedEvent, "event deleted successfully"));

})



export {
     createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent

}