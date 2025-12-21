import React from 'react'
import RegisterForm from '../components/Auth/registerForm'


const RegisterPage = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-background'>
      <div className='absolute inset-0 bg-linear-to-br from-secondary to-secondary opacity-1' />
      <div className='z-5 w-full max-w-md px-4'>
         <div className='mb-2 text-center'>
            <h1 className='text-3xl font-bold text-foreground'>join us to day</h1>
            <p>create an account in just a few steps</p>
         </div>
         {/* {registrartion form} */}
          <RegisterForm/>
      </div>
    </div> 
  )
}

export default RegisterPage