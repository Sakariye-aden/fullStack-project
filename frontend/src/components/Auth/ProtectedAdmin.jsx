import React, { useEffect } from 'react'
import useAuthstore from '../../lib/Store/AuthStore'
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/Api/ApiClient';
import { Navigate, useLocation } from 'react-router';
import { Loader } from 'lucide-react';

const ProtectedAdmin = ({ children }) => {
      
    const location = useLocation()
     
     const { user , token , setAuth , clearAuth } = useAuthstore();

     const {isLoading, error, isError, data , isSuccess }= useQuery({
        queryKey: ['currenUser'],
        queryFn : async () => {
             const response = await api.get('/auth/me');
             return response.data
         },
         retry : 1
     })

    //  error case 
    useEffect(()=>{
        if(error){
            clearAuth()
        }
    }, [error, isError, clearAuth])
      
    // success case 
    useEffect(()=>{
        if(data && isSuccess){
            setAuth(data, token)
        }
    }, [data , isSuccess , setAuth])

      if(isLoading){
            return (
               <div className='h-screen flex justify-center items-center'>
                  <Loader className='animate-spin text-2xl' />
               </div>
            )
         }

    if(isError){
        return <Navigate to="/login" state={{from : location}} replace />
    }

    if(!user){
        return <Navigate to="/login"  state={{from : location }} replace />
    }

    if(user.role !== 'admin'){
      return <Navigate to="/dashboard"  replace />
    }
  return children
}

export default ProtectedAdmin