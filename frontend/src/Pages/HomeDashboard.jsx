import { useState } from 'react'
import api from '../lib/Api/ApiClient'
import { useQuery } from '@tanstack/react-query'
import useAuthstore from '../lib/Store/AuthStore'
import { Loader } from 'lucide-react';
import {Card,CardHeader,CardFooter,CardTitle,CardAction,CardDescription,CardContent} from '@/components/ui/card'



const HomeDashboard = () => {
      const { user } = useAuthstore()
     const [result , setResult ] = useState([])
  
      const {data , error, isLoading } = useQuery({
        queryKey: ['trans'],
        queryFn : async () => {
           const response = await api.get('/transactions');
            console.log('response trans :', response);
 
            return response.data
         }
      })
     
       if(isLoading){
       return (
          <div className='h-screen flex justify-center items-center'>
             <Loader className='animate-spin text-3xl' />
          </div>
       )
    }

  return (
    <div className="bg-card h-min-screen p-4">
      <h1 className="text-2xl font-medium ">Hello, {user.name} 👏</h1>
      {/* cards */}
      <div>
        <div className='my-4'>
          <Card className='bg-linear-to-r from-green-500 to-green-600'>
            <CardContent className='h-12 flex flex-col text-primary-foreground'>
               <span>Total Balance</span>
                <span className='text-2xl font-medium'>${12600}</span>
            </CardContent>
          </Card>
        </div>
         <div className='flex space-x-4 my-3'>
           <Card className='w-full bg-linear-to-r from-green-500 to-green-600'>
            <CardContent className='h-12 flex flex-col text-primary-foreground'>
               <span>Income</span>
                <span className='text-2xl font-medium'>${12600}</span>
            </CardContent>
           </Card>
            
           <Card className=' w-full bg-linear-to-r from-red-500 to-red-600'>
            <CardContent className='h-12 flex flex-col text-primary-foreground'>
               <span>Expenses</span>
                <span className='text-2xl font-medium'>${12600}</span>
            </CardContent>
           </Card>
           <Card className=' w-full bg-linear-to-r from-blue-500 to-blue-600'>
            <CardContent className='h-12 flex flex-col text-primary-foreground'>
               <span>Savings</span>
                <span className='text-2xl font-medium'>${12600}</span>
            </CardContent>
           </Card>
         </div>
      </div>
    </div>
  );
}

export default HomeDashboard