import React, { useState } from 'react'

import { ArrowRightLeft, Loader, Pencil, User } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import api from '../lib/Api/ApiClient'

import { AlertDialog, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,AlertDialogFooter,
   AlertDialogHeader,AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Button } from '@/components/ui/button'
import toast from 'react-hot-toast';





 const AdminPage = () => {
 
      const [ editRole , setEditRole ]=useState(null)
      const [isOpen , setIsOpen ]= useState(false);
       
      const queryClient = useQueryClient()


    const handleOpen = ()=>{
      setIsOpen(false)
      setEditRole(null)
    }




    //   Admin Summary 
        const { data , error , isLoading } = useQuery({
           queryKey : ['adminKey'],
           queryFn : async () => {
              const response = await api.get('/admin/overview');
             
              return response.data
           }
        })
     
        // user Information
        const { data:Data  , isLoading: Loading } = useQuery({
           queryKey : ['adminInfo'],
           queryFn : async () => {
              const response = await api.get('/admin/userinfo');
             
              return response.data
           }
        })

      //  put Role user 
         const UpdateroleMutation = useMutation({
            mutationFn : async (updateData) => {
              const response = await api.put(`/admin/userinfo/${editRole?._id}`, updateData);

               return response.data;
            }, 
            onSuccess : (data)=>{
              toast.success(data);
               queryClient.invalidateQueries(['adminInfo'])
               setEditRole(null)
              console.log('data updated:',data);
            },
            onError : (error)=>{
              console.log('error :', error);
              toast.error('error occured ')
            }
         })

       
      if(isLoading || Loading){
       return (
          <div className='h-screen flex justify-center items-center'>
             <Loader className='animate-spin text-3xl' />
          </div>
       )
     }


  const handleEdit = (User)=>{
      setEditRole(User)
  }


  const updateRole = async () => {
      
       if(editRole.role === 'user'){
         UpdateroleMutation.mutateAsync({
           role : 'admin'
         })
       }else{
         UpdateroleMutation.mutateAsync({
           role : 'user'
         })
       }
  }






  return (




    <div className="bg-card h-min-screen p-6 ">
        <h1 className="text-2xl font-medium py-2">Welcome to Admin Dashboard</h1>   
        <p>Manage users, monitor system activity, and control financial data across the platform</p>
      
      {/* Admin Summary cards */}
         <h3 className='text-xl font-medium py-4 my-3 '>Admin Summary Cards</h3>
        <div className='my-3 grid grid-cols-2 md:grid-cols-4 gap-6 '>
            
            <div className='w-full flex justify-between bg-background rounded-md shadow-md p-6'>
              <div className='flex flex-col'>
                 <span>Total User</span>
                 <span className='font-bold text-xl'>{data?.totalUsers}</span>
              </div>
               <User />
            </div>
            <div className='w-full flex justify-between bg-background rounded-md shadow-md p-6'>
              <div className='flex flex-col'>
                 <span>Total Transaction</span>
                 <span className='font-bold text-xl'>{data?.totalTransactions}</span>
              </div>
                <ArrowRightLeft />
            </div>
            <div className='w-full flex justify-between bg-background rounded-md shadow-md p-6'>
              <div className='flex flex-col'>
                 <span>Total Income</span>
                 <span className='font-bold text-xl'>{data?.totalIncome}</span>
              </div>
                <span className='text-2xl'>📈</span>
            </div>
            <div className='w-full flex justify-between bg-background rounded-md shadow-md p-6'>
              <div className='flex flex-col'>
                 <span>Total Expense</span>
                 <span className='font-bold text-xl'>{data?.totalExpense}</span>
              </div>
                <span className='text-2xl' >📉</span>
            </div>
        </div>
      {/* User Management  */}
           <div>
               <h3 className='text-xl font-medium py-4 my-3 '>User Management</h3>
               <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg shadow-md">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-md ">
              <thead className="bg-gray-100 text-gray-700 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                   User
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Role
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Data?.map((User) => (
                  <tr
                    key={User._id}
                    className="hover:bg-chart-1 transition-colors duration-200"
                  >
                    <td className="px-4 py-2">
                       {User.name}
                    </td>
                    <td className="px-4 py-2 ">{User.email}</td>
                    <td className="px-2 py-2 ">{User.role}</td>
                    <td>
                      Active
                    </td>
                    <td className="px-2 py-2 flex ">
                        Role
                      <button
                        className="p-1  text-sm  rounded cursor-pointer "
                        onClick={() => handleEdit(User)}
                      >
                        <Pencil className="w-4 h-4 text-blue-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           </div>
      {/* cateGory management */}

      {/* Transaction monitoring */}



        {/* Alert Dialog */}
         {/* alert Dialog  */}
              <AlertDialog open={isOpen || !!editRole} onOpenChange={handleOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure to change the role ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <span className="text-lg font-medium pr-1">
                        {editRole?.name}
                      </span>
                       will take more power to see more sensitive data that the other users are not allowed to see please carefully! he has a right to change the other users Role
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
        
                    <Button onClick={updateRole}>
                      {UpdateroleMutation.isPending ? (
                        <span className="flex justify-center items-center gap-2">
                          <Loader className="animate-spin" />
                          updating
                        </span>
                      ) : (
                        "Update"
                      )}    
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
    </div>
  )
}

export default AdminPage