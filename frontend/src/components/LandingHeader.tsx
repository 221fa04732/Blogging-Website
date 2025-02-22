import { Profileatom } from "../Atoms/Profile";
import { useRecoilState, useRecoilValue } from "recoil";
import { Useratom } from "../Atoms/User";
import getCookie from "./GetToken";
import { Link } from "react-router-dom";


export default function LandingHeader(){

    const userInfo = useRecoilValue(Useratom)

    const userName = userInfo.name || "Guest"
    const [profileVisible, setProfileVisible] = useRecoilState(Profileatom)
    const loginStatus = getCookie("loginStatus");
    console.log(loginStatus)

    return(<div className="h-16 flex text-white items-center justify-between sm:w-10/12 w-11/12">
        <div className="flex items-center gap-4">
            <img className="min-h-10 max-h-10 min-w-10 max-w-10" src="/blog.png"/>
            <div className="text-3xl font-semibold hidden sm:block">BlogCraft</div>
        </div>

        {loginStatus ? <div className="flex items-center gap-4">
            <button onClick={(e)=>{
                e.stopPropagation();
                profileVisible ? setProfileVisible(false) : setProfileVisible(true)
            }} className="min-h-10 max-h-10 min-w-10 max-w-10 bg-slate-600 rounded-full font-bold text-2xl flex justify-center items-center">{userName[0].toUpperCase()}</button>
        </div> : <Link to={'/signin'}>Signin</Link>}
    </div>)
}