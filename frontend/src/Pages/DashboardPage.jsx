
import { ArrowRightLeft, ChartColumn, LayoutDashboard, LogOut, Menu, UserStar } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Link, Outlet } from 'react-router'
import useAuthstore from '../lib/Store/AuthStore'
import {Button } from '@/components/ui/button'
import { useState } from 'react'




const DashboardPage = () => {

  const { user } = useAuthstore()
  const [isOpen , setisOpen]= useState(false)

  return (
    <div className='min-h-screen bg-gray-50'>
        {/* labtop designn */}
         <div  className='hidden md:grid grid-cols-5  min-h-screen'>
           {/* left bar */}
           <div className='border-r bg-card'>
               <div className='bg-card border-b  p-2'>
                  <span className='font-medium text-2xl text-gray-800'>Finance</span> 
                  { isOpen && <span className='pl-2 text-xl text-gray-500'>Tracker</span>}
               </div>
               <div className='h-110 flex flex-col gap-6 px-2 py-6 border-b'>
                 <Link to="/dashboard" className='flex items-center space-x-2'>
                   <LayoutDashboard  className='w-6 h-6' />
                    <span>Dashboard</span>
                 </Link>
                 <Link to="/dashboard/transactions" className='flex items-center space-x-2'>
                    <ArrowRightLeft />
                    <span>Transactions</span>
                 </Link>
                 <Link to="/dashboard/report" className='flex items-center space-x-2'>
                      <ChartColumn />
                    <span>Reports</span>
                 </Link>
                 {
                   user.role == 'admin' && (
                    <Link to="/dashboard/admin" className='flex items-center space-x-2'>
                        <UserStar />
                      <span>Admin</span>
                    </Link>
                  )
                 }
              </div>
                <div className='flex p-2'>
                   {/* <div className='h-11 w-10 flex justify-center text-white text-3xl font-medium rounded-full bg-blue-600 text-center'>{user.name[0]}</div>   */}
                     <Avatar>
                      <AvatarImage src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-629.jpg" />
                      <AvatarFallback>CN</AvatarFallback>
                     </Avatar>
                   <div className='flex flex-col overflow-hidden'>
                     <span className='font-medium text-lg'>{user.name}</span>
                     {/* <span>online</span> */}
                   </div>     
                </div>
                 <div className='p-2 '>
                    <Button>
                      <LogOut />
                      Logout 
                    </Button>
                 </div>
           </div> 
           {/* right bar  */}
           <div className='col-span-4 '>
              
              <div className='bg-card flex items-center justify-between p-2 border-b'>
                 <div className='flex space-x-2'>
                    <Menu onClick={()=>setisOpen(!isOpen)} /> 
                    <h1>Dashboard</h1>
                 </div>
                  <div>
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
              </div>
               <Outlet />
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