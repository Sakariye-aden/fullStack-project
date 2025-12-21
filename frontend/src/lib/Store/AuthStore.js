import {create } from 'zustand'
import {persist } from 'zustand/middleware'
// store use get 
const useAuthstore = create(
     
    persist(
        (set, get)=>(
        {
           user : null,
           token :null,
           isAuthenticted :false,

           setUser : ()=>set((userData, token)=>({
               user : userData,
               token,
               isAuthenticted: true
             })),

           clearAuth : ()=>set({
              user : null,
              token:null,
              isAuthenticted: false
           })  ,

           getToken : get().token
        },
        {
            name:"testAuth",
            partialize : (state)=>({
                user:state.user,
                token : state.token,
                isAuthenticted: state.isAuthenticted
            })
        }
 )
)
);

export default useAuthstore