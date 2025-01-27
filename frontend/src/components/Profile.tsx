import { Link, useLocation } from "react-router-dom";
import UpperCase from "./UpperCase";
import { useNavigate } from "react-router-dom";
import { Profileatom } from "../Atoms/Profile";
import { useSetRecoilState } from "recoil";
import { useEffect, useRef } from "react";

export default function Profile(){

    const profiledropdown = useRef<HTMLDivElement>(null)
    const location = useLocation()
    
    useEffect(()=>{
        setProfileVisible(false)
    },[location])

    const closeDropdown = (e : MouseEvent) =>{
        if(profiledropdown.current && !profiledropdown.current.contains(e.target as Node)){
            setProfileVisible(false)
        }
    }

    useEffect(()=>{
        document.addEventListener('click', closeDropdown)
        return () => {
            document.removeEventListener('click', closeDropdown)
        }
    },[])

    const name = localStorage.getItem("Loged-In-UserName") || ""
    const UpperCaseName = UpperCase(name).slice(0,20)
    const navigate = useNavigate();
    const setProfileVisible = useSetRecoilState(Profileatom)
    
    return(<div ref={profiledropdown} className="bg-stone-700 text-white flex flex-col mt-1 p-2 rounded-md border border-gray-500 sm:text-base text-sm w-full min-w-52">
        <div className="border-b border-stone-600 mb-1 pb-1 flex flex-col w-full">
            <div className="hover:bg-stone-600 w-full py-1 px-2 rounded-md max-h-8 flex">
                <img src="./profile.png" className="max-h-5 min-h-5 min-w-5 max-w-5 mr-3" />
                {UpperCaseName}
            </div>
            <div className="hover:bg-stone-600 w-full py-1 px-2 rounded-md max-h-8 flex">
                <img src="./followers.png" className="max-h-5 min-h-5 min-w-5 max-w-5 mr-3" />
                Followers : Na
            </div>
        </div>
        <div className="border-b border-stone-600 mb-1 pb-1 flex flex-col w-full">
            <Link to={'/my-blog'} onClick={()=>{
                setProfileVisible(false)
            }} className="hover:bg-stone-600 w-full py-1 px-2 rounded-md max-h-8 flex justify-start items-center">
                <img src="./yourblog.png" className="max-h-5 min-h-5 min-w-5 max-w-5 mr-3" />
                <div>Your Blogs</div>
            </Link>
            <Link to={'/my-profile'} onClick={()=>{
                setProfileVisible(false)
            }} className="hover:bg-stone-600 w-full py-1 px-2 rounded-md max-h-8 flex justify-start items-center">
                <img src="./setting.png" className="max-h-5 min-h-5 min-w-5 max-w-5 mr-3"/>
                <div>Edit Profile</div>
            </Link>
        </div>
        <button onClick={()=>{
            localStorage.removeItem("BlogCraft-Token")
            localStorage.removeItem("Loged-In-UserEmail")
            localStorage.removeItem("Loged-In-UserId")
            localStorage.removeItem("Loged-In-UserName")
            localStorage.removeItem("Specific-Blog-Id")
            setProfileVisible(false)
            navigate('/signin')
        }} className="hover:bg-stone-600 w-full py-1 px-2 rounded-md flex justify-start items-center max-h-8">
            <img src="./logout.png" className="max-h-5 min-h-5 min-w-5 max-w-5 mr-3"/>
            <div>Log out</div>
        </button>
    </div>)
}