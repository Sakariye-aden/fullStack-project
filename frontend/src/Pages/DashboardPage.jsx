import { Menu } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const DashboardPage = () => {



  return (
    <div className='min-h-screen bg-gray-50'>
        {/* labtop designn */}
         <div  className='hidden md:grid grid-cols-5  min-h-screen'>
           {/* left bar */}
           <div className='border-r'>
               <div className='bg-card border-b  p-2'>
                 <span className='font-medium text-2xl text-gray-800'>Finance</span> 
                 <span className='pl-2 text-xl text-gray-500'>Tracker</span>
               </div>
           </div> 
           {/* right bar  */}
           <div className='col-span-4 '>
              
              <div className='bg-gray-50 flex items-center justify-between p-2 border-b'>
                 <div className='flex space-x-2'>
                    <Menu /> 
                    <h1>Dashboard</h1>
                 </div>
                  <div>
                    <Avatar>
                    <AvatarImage src="" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
              </div>
           </div>
        </div>

        {/* mobile  design  */}
        <div className='md:hidden h-screen bg-green-600'>
             <h1>Mobile design</h1>
        </div>
    </div>
  )
}

export default DashboardPage