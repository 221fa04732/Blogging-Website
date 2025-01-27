import { Navigate } from "react-router-dom"

export default function UnAuthorized(props : any){

    const authtoken = localStorage.getItem("BlogCraft-Token")

    return authtoken ? props.children : <Navigate to={'/signin'} />

}   