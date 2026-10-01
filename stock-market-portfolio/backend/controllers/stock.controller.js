import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { Stock } from "../models/Stock.model.js";
import mongoose from "mongoose";


// create stock
const createStock = asyncHandler(async (req, res) => {
     
       // get data from frontend
       const {company, description, initialPrice} = req.body;

          console.log(company);
          console.log(description);
          console.log(initialPrice);
          
      if(!company|| !description|| !initialPrice){
         throw new ApiError(400, "All fields are required");
      }

     const stock= await Stock.create({
         company,
         description,
         initialPrice
      })

      return  res.json(
        new ApiResponse(201, stock, "Stock created successfully")
      );

})

// get all stocks

const getAllStocks = asyncHandler(async (req, res) => {
     
      const allStocks=  await Stock.find();
       console.log(allStocks);
       
      return res.json(
        new ApiResponse(200, allStocks, "Got All Stocks"));
})

// get stock by id

const getStockById= asyncHandler(async (req,res) => {
     
     const {id} = req.params; // parameter
   
    if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(404, "invalid id");
    }

    const stock=  await Stock.findById(id);
    
    if(!stock){
         throw new ApiError(404, "stock not found");
    }

    return res
          .json(new ApiResponse(200, stock, "Got Stock"))   

})

// update stock

const updateStock = asyncHandler(async (req, res) => {
     
     const {id} = req.params;
     
     if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(404, "invalid id");
     }

    const {company , description, initialPrice} = req.body;

    const updatedStock=  await Stock.findByIdAndUpdate(id, {
         company,
         description,
         initialPrice
     },
      {
         new: true,
         runValidators: true
      }
    );
    
     return res 
            .json(new ApiResponse(200, updatedStock, "Stock updated successfully"));
})

// delete stock

const deleteStock = asyncHandler(async (req, res) => {
      
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(404, "invalid id");
    }

   const deletedStock= await Stock.findByIdAndDelete(id);
   if(!deletedStock){
     throw new ApiError(404, "stock not found");
   }

   return res 
          .json(new ApiResponse(
            200, deletedStock, "stock deleted successfully"))

})


export {
     createStock,
     getAllStocks,
     getStockById,
     updateStock,
     deleteStock
}