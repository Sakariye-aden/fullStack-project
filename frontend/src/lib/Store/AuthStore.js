import {create } from 'zustand'
import {persist } from 'zustand/middleware'
// store use get 
const useAuthstore = create(
     
    persist(
        (set, get)=>({
            user : null, 
            token : null, 
            isAuthenticated : false ,

            // update state 
            setAuth : (userData, token)=> set({
               user : userData,
               token , 
               isAuthenticated : true
            }), 

            // clear state 

            clearAuth : ()=> set({
                user : null , 
                token : null ,
                isAuthenticated : false
            }), 
            // get token for outside react component 
            getToken : ()=> get().token
        }),
        {
            name : "test-storage",
            partialize :(state)=>({
                user : state.user, 
                token : state.token ,
                isAuthenticated : state.isAuthenticated
            })
        }
       
)
);

export default useAuthstore