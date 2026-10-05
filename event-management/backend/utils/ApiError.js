class ApiError extends Error{
        
       constructor(
        statusCode,
        message= "something went wrong", // hard coded
        errors= [],
        stack= ""  // this tell where the error exactly occurs
       ){
         super(message)
         this.data= null;
         this.message= message;
         this.success = false;
         this.errors = errors

         if(stack){
             this.stack = stack;
         }else{
             Error.captureStackTrace(this, this.constructor)
         }
       }
}

export{ ApiError}