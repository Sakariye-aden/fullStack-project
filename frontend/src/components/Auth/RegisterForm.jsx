import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router'


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



   const handleSubmit = (e)=>{
     e.preventDefault();

      if(!formData.name || !formData.email || !formData.password){
        setError('all fields are required')
         return
     }

      if(formData.confirmpassword != formData.password){
        setError('password must match');
        return
      }
     
      

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
             {error && 
               <p className='bg-destructive/50 p-2 rounded-md'>{error}</p>
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
             
             <Button type="submit">Create Account</Button>
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