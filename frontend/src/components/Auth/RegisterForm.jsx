import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/Api/ApiClient'
import { errorhandle } from '../../utility/errorHandle';

const RegisterForm = () => {

   const navigate = useNavigate()

      const [formData , setformData]= useState({
          name:"",
          email:"",
          password:"",
          confirmpassword:""
      })

 const [error , setError]= useState(null)
 
    const handleChange = (e)=>{
        const { name, value} = e.target;

        setformData({...formData, [name]:value})
    }

  //  mutatation 
    const registerMutation= useMutation({
      mutationFn: async (userDAta) => {
         const response = await api.post('/auth/register', userDAta);
           return response.data
      },
      onSuccess:(data)=>{
        navigate('/login')
      },
      onError:(error)=>{
        setError(errorhandle(error))
      }
    })

     

   const handleSubmit = (e)=>{
     e.preventDefault();


      if(!formData.name || !formData.email || !formData.password){
        setError('all fields are required')
         return
     }

      if(formData.password !== formData.confirmpassword){
        setError('password must match');
        return
      }
     
    //  register mutate
      registerMutation.mutate({
         name : formData.name,
         email:formData.email,
         password : formData.password
      })
   }

    
  
    
  return (
    <Card>
         <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Enter you detailes to register</CardDescription>
         </CardHeader>
         <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
             {error && (
               <p className='bg-destructive/50 p-2 rounded-md'>{error}</p>
              )    
             }
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="abdi"
                 value={formData.name}
                 onChange={handleChange}
                
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                 onChange={handleChange}
                
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">password</Label>
              <Input
                id="password"
                 name="password"
                type="password"
                placeholder="***********"
                value={formData.password}
                onChange={handleChange}
                
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmpassword">confirm password</Label>
              <Input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                placeholder="**********"
                 value={formData.confirmpassword}
                 onChange={handleChange}
              
              />
            </div>
             
             <Button type="submit">
               {registerMutation.isPending ?  <Loader/> : 'create account'}
             </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2">
         <span>Already have an account ?</span>
         <span onClick={()=> navigate('/login')} className='text-red-500 cursor-pointer'>sign in </span>
      </CardFooter>
    </Card>
  )
}

export default RegisterForm