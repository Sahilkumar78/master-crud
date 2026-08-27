class ApiError extends Error{
     
     constructor(
        statuscode,
        message= "Something went wrong",
        errors=[],
        stack="" // stack trace tell where exactly error happend
     ){
        super(message)
        this.data= null;
        this.message = message
        this.success = false
        this.errors = errors;

        if(stack){
             this.stack = stack
        }else{
             Error.captureStackTrace(this, this.constructor);
        }

     }
}

export {ApiError};