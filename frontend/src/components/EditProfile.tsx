import { useState } from "react"
import UpperCase from "./UpperCase"
import { AlertMessageatom } from "../Atoms/AlertMessage"
import { useSetRecoilState } from "recoil"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { ProfileLoadingatom } from "../Atoms/ProfileLoader"


export default function EditProfile(){

    const [newName, setNewname] = useState('')
    const [oldPassword, setOldpassword] = useState('')
    const [newPassword, setNewpassword] = useState('')
    const [confirmPassword, setConfirmpassword] = useState('')
    const setAlertmessage = useSetRecoilState(AlertMessageatom)
    const setProfileloading = useSetRecoilState(ProfileLoadingatom)


    async function updateusername(){

        console.log(newName)
        if(newName === ''){
            setAlertmessage({
                show : true,
                message : "Invalid Input",
                status : 404
            })
        }
        else{
            
            try{
                const response = await axios.put(`${BACKEND_URL}/api/v1/changeCredentials/userName`,{
                    name : newName
                },{
                    headers :{
                        Authorization : localStorage.getItem("BlogCraft-Token")
                    }
                })
    
                if(response.status === 200){
                    localStorage.setItem("Loged-In-UserName", newName)
                    setNewname('')
                }
    
                setAlertmessage({
                    show : true,
                    message : response.data.msg,
                    status : response.status
                })
            }
            catch(e){
                setAlertmessage({
                    show : true,
                    message : "Internal Server Error",
                    status : 404
                })
            }
        }
        setProfileloading(false)

    }


    async function updatepassword(){

        if(oldPassword === '' || newPassword === "" || confirmPassword === ""){
            setAlertmessage({
                show : true,
                message : "Invalid Input",
                status : 404
            })
        }

        else if(newPassword != confirmPassword){
            setAlertmessage({
                show : true,
                message : "Password Mismatch",
                status : 404
            })
        }

        else if(newPassword.length < 8 || oldPassword.length < 8 || confirmPassword.length < 8){
            setAlertmessage({
                show : true,
                message : "Invalid Password",
                status : 404
            })
        }

        else{
            
            try{
                const response = await axios.put(`${BACKEND_URL}/api/v1/changeCredentials/password`,{
                    oldPassword : oldPassword,
                    newPassword : newPassword
                },{
                    headers :{
                        Authorization : localStorage.getItem("BlogCraft-Token")
                    }
                })

                setOldpassword('')
                setNewpassword('')
                setConfirmpassword('')
                setAlertmessage({
                    show : true,
                    message : response.data.msg,
                    status : response.status
                })
            }
            catch(e){
                setAlertmessage({
                    show : true,
                    message : "Internal Server Error",
                    status : 404
                })
            }
        }
        setProfileloading(false)
        
    }

    const name = localStorage.getItem("Loged-In-UserName") || ""
    const userName = UpperCase(name)

    return(<div className="bg-stone-800  mt-16 w-11/12 sm:w-10/12 flex flex-col items-center font-handwritten">
        
        <fieldset className="border border-gray-300 w-11/12 mb-16 flex flex-col justify-center p-6">
            <legend className="text-lg ml-6 px-1">Update Username</legend>
            <div className="text-gray-400 text-xl pb-6">Current UserName : {userName}</div>
            <label className="text-gray-400">New UserName</label>
            <input className="w-full bg-stone-800 focus:outline-none border border-gray-600 rounded-sm px-4 py-2"
            type="text" 
            value={newName}
            onChange={(e)=>{
                setNewname(e.target.value)
            }}
            ></input>
            <div className="flex justify-center w-full mt-8">
                <button onClick={()=>{
                    setProfileloading(true)
                    updateusername()
                }} className="text-lg px-4 py-2 rounded-md  shadow-black shadow-md ">Update</button>
            </div>
            
        </fieldset>

        <fieldset className="border border-gray-300 w-11/12 mb-16 flex flex-col justify-center p-6">
            <legend className="text-lg ml-6 px-1">Update Password</legend>

            <label className="text-gray-400">Current Password</label>
            <input className="w-full bg-stone-800 focus:outline-none border border-gray-600 rounded-sm px-4 py-2"
            type="text" 
            value={oldPassword}
            onChange={(e)=>{
                setOldpassword(e.target.value)
            }}
            ></input>
            <label className="pt-6 text-gray-400">New Password</label>
            <input className="w-full bg-stone-800 focus:outline-none border border-gray-600 rounded-sm px-4 py-2"
            type="text"
            value={newPassword}
            onChange={(e)=>{
                setNewpassword(e.target.value)
            }}
            ></input>
            <label className="pt-6 text-gray-400">Confirm Password</label>
            <input className="w-full bg-stone-800 focus:outline-none border border-gray-600 rounded-sm px-4 py-2"
            type="text"
            value={confirmPassword}
            onChange={(e)=>{
                setConfirmpassword(e.target.value)
            }}
            ></input>
            <div className='text-red-600 text-sm'>Password must be greater than 8</div>
            <div className="flex justify-center w-full mt-8">
                <button onClick={()=>{
                    setProfileloading(true)
                    updatepassword()
                }} className="text-lg px-4 py-2 rounded-md  shadow-black shadow-md">Update</button>
            </div>
        </fieldset>
        
    </div>)
}