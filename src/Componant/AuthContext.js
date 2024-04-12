import { createContext, useEffect, useState } from "react";

 export  let authcontext= createContext()
 export default  function AuthcontextProvider({children}){
    
    const [userislogin ,setueserislogin]= useState(!!localStorage.getItem('Usertoken'))
//    useEffect(()=>{
//     if(localStorage.getItem('Usertoken') !=null){
//         setueserislogin(true)
//     } 
//    },[])   
 

return<>
<authcontext.Provider value={{setueserislogin,userislogin}}>
    {children}
</authcontext.Provider>

</>
}