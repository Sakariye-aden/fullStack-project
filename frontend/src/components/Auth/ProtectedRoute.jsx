import React from 'react'
import useAuthstore from '../../lib/Store/AuthStore'
import { useQueries } from '@tanstack/react-query'

const ProtectedRoute = ({ children }) => {
  
    const {user , token } = useAuthstore()
     
      const { data, error, isError , isSuccess } = useQueries({
          queryKey: ['auth'],
          queryFn: fetchTod,
       })


     return children
}

export default ProtectedRoute