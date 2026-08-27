import mongoose from "mongoose";


const connectDB = async () => {
     
          try { await mongoose.connect(process.env.MONGO_URI);
            console.log("mongodb connected successfully");
            
        } catch (error) {
            console.log("error while connecting mongodb: ", error.message);
            process.exit(1); // exit with failure
        }
}

export {connectDB};