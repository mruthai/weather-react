import { useContext } from "react"
import { AuthContext } from '../contexts/AuthProvider'


export default function Home() {

    const { user } = useContext(AuthContext)
  
    console.log(user)
    return (
        <div className="App">
            
            {
                (user.loggedIn) 
            }
            
           


        </div>
    )
}