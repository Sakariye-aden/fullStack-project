import React from 'react'
import useAuthstore from '../../lib/Store/AuthStore'
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/Api/ApiClient';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({ children }) => {

   const location = useLocation()
   
   const { user , token, setAuth, clearAuth } = useAuthstore();

   const { isLoading ,data , error , isError , isSuccess} = useQuery({
     queryKey:['currentUser'],
     queryFn : async () => {
           const response = await api.get('auth/me');
           console.log('result:', response);
           return response.data;
       },
       retry : 1
   })
    

    //  case Error
    useEffect(()=>{
         if(error){
           console.log('err:',error);
           clearAuth()
         }
    }, [error, isError , clearAuth]) 

    useEffect(()=>{
       
       if(data && isSuccess){
        setAuth(data, token)
       }
    },[data , isSuccess , setAuth, token])

    if(isLoading){
       return (
          <div className='h-screen flex justify-center items-center'>
             <Loader className='animate-spin text-2xl' />
          </div>
       )
    }

     if(isError){
      return <Navigate to={'/login'} state={{from : location}} replace/>
     }
 
     if(!user){
       return <Navigate to={'/login'} state={{from : location}} replace/>
     }
     
  return children

   
}

export default ProtectedRoute