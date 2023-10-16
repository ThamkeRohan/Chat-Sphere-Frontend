import React, { useEffect, useState } from 'react'

export const AuthContext = React.createContext()
export const AuthUpdateContext = React.createContext()
function AuthProvider({children}){
    const [user, setUser] = useState(null)
    useEffect(()=>{
        getUser()
        .then(user => setUser(user))
    }, [])
    console.log(user);
    async function getUser(){
        
        // if (JSON.parse(localStorage.getItem("CHAT_TOKEN")) == null) return;
        const response = await fetch('http://localhost:5000/api/users/profile',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('CHAT_TOKEN')}`
            }
        })
        const data = await response.json()
       
        if(response.ok){
            return data
        }else{
            console.log(data);
        }
    }
    function addUser(user){
        setUser(user)
    }
    
    function logoutUser(){
        localStorage.setItem("CHAT_TOKEN", null)
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{user}}>
            <AuthUpdateContext.Provider value={{addUser, logoutUser}}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}
export default AuthProvider
