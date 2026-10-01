import { Watchlist } from "../models/Watchlist.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";



// create watchlist
const createWatchList = asyncHandler(async (req, res) => {
     
    const {stockId} = req.body;
    
     if(!stockId){
         throw new ApiError(400, "stockId required");
     }
    
    const watchlist=  await Watchlist.create({
        stockId
     })

    return res 
          .json(new ApiResponse(201, watchlist, "watchlist created successfully"));
     
})

// get watchlist

const getAllWatchlists= asyncHandler(async (req, res) => {
     
    const getwatchlists= await Watchlist.find();

    return res 
           .json(new ApiResponse(200, getwatchlists,
             "got all watchlists"));
})


// get watchlist by stock id

const getWatchListById= asyncHandler(async (req, res) => {
     
     const {id} = req.params;
     const {stockId} = req.body;
    
      if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(400, "invalid id");
      }

    const watchlist=   await Watchlist.findById(id);
      
     if(!watchlist){
         throw new ApiError(404, "watchlist not found");
     }

     return res 
            .json(new ApiResponse(200, watchlist,
                 "got watchlist"));

})

// update watchlist 

const updateWatchlist= asyncHandler(async (req, res) => {
     
    const {id} = req.params;
    const {stockId} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(400, "invalid id");
    }

   if(!stockId){
     throw new ApiError(400, "stockId required");
   }
    

  const updatedWatchList=  await Watchlist.findByIdAndUpdate(id, 
        {
        stockId
    },
     {
         new : true,
         runValidators:true
     }
)
    return res 
          .json(new ApiResponse(200, updatedWatchList,
             "watchlist updated successfully"));

})

//delete watchlist

const deleteWatchlist= asyncHandler(async (req, res) => {
       
       const {id} = req.params;

       if(!mongoose.Types.ObjectId.isValid(id)){
         throw new ApiError(400, "invalid id");
       }
      
      const deletedWatchlist=  await Watchlist.findByIdAndDelete(id);
    
       if(!deletedWatchlist){
         throw new ApiError(404, "deletedWatchlist not found");
       }

       return res 
             .json(new ApiResponse(200, deletedWatchlist, 
                "watchlist deleted successfully"
             ));
})

export {
     createWatchList,
     getAllWatchlists,
     getWatchListById,
     updateWatchlist,
     deleteWatchlist
}