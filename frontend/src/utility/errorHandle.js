
export const errorhandle =(error)=>{
  
    if(!error) return null ;
    
    if(error.response?.data){
        const data = error.response.data;

        // handle zod errors 
       if(data.errors && Array.isArray(data.errors)){
        return data.errors.map(err=> err.message).join(',')
       }

     //    handle single error in axios
      if(data.message){
        return data.message
      }
    }

    // handle error network 
    if(error.response && !error.response){
        return 'Network error please check your connection'
    }

    // fall back 
    if(error.message){
        return error.message
    }

    // handle other types of errors 
    return 'some thing went wrong please try again '
}