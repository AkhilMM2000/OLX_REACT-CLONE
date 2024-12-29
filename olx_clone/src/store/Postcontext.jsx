import { createContext,useState } from "react";

export const Postcontext = createContext(null);

function Posts({children}){
 const [postdetails,Setpostdetails]=useState("")
    return(
        <Postcontext.Provider value={{postdetails,Setpostdetails}}>
{children}
        </Postcontext.Provider>
    )
}
export default Posts
