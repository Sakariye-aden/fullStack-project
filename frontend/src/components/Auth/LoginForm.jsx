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
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/Api/ApiClient'
import { Loader } from 'lucide-react'


const LoginForm = () => {

   const navigate = useNavigate()

    const [formData , setformData]= useState({
             email:"",
             password:""
         })
   
    const [error , setError]= useState(null)
    
       const handleChange = (e)=>{
           const { name, value} = e.target;
   
           setformData({...formData, [name]:value})
       }
   
     //  mutatation 
     const loginMutation = useMutation({
       mutationFn : async (credentials) => {
           const response = await api.post('/auth/login', credentials)
           console.log('response :', response)
           return response.data
       },
       onSuccess:(data)=>{
         console.log('data success:', data);
         navigate('/dashboard')
       },
       onError:(error)=>{
         console.log('error:',error);
         setError('error happened')
       }
     })
   
        
   
      const handleSubmit = (e)=>{
        e.preventDefault();
   
   
         if( !formData.email || !formData.password){
           setError('all fields are required')
            return
        }
   
        // login mutation 
        loginMutation.mutate({
          email : formData.email,
          password: formData.password
        })
      
      }

  return (
    <Card>
             <CardHeader className="text-center">
                <CardTitle className="text-2xl">Sign in</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
             </CardHeader>
             <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
               {error && (
                 <p className='bg-destructive/50 p-2 rounded-md'>{error}</p>
                )    
               } 
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="***********"
                  />
                </div>
                 
                 <Button>
                   {loginMutation.isPending ? <span className='flex justify-center items-center gap-2'><Loader/> sign in</span> : 'sign in'}
                 </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center space-x-2">
             <span>Don't have an account ?</span>
             <span onClick={()=> navigate('/register')} className='text-red-500 cursor-pointer'>sign up </span>
          </CardFooter>
        </Card>
  )
}

export default LoginForm