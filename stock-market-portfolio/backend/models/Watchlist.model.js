import mongoose from "mongoose";

const watchlistSchema= new mongoose.Schema({
     
     stockId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Stock'
     },

     addedAt: {
         type: Date,
         default: Date.now
     }
}, {timestamps: true})


const Watchlist= mongoose.model('Watchlist', watchlistSchema);

export {Watchlist};
