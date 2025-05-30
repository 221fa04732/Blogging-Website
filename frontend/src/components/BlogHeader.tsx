import { Link } from "react-router-dom";
import { Profileatom } from "../Atoms/Profile";
import { useRecoilState } from "recoil";


export default function BlogHeader(){

    const userName = localStorage.getItem("Loged-In-UserName") || "guest"
    const [profileVisible, setProfileVisible] = useRecoilState(Profileatom)

    return(<div className="h-16 flex text-white items-center justify-between sm:w-10/12 w-11/12">
        <div className="flex items-center gap-4">
            <img className="min-h-10 max-h-10 min-w-10 max-w-10" src="/blog.png"/>
            <div className="text-3xl font-semibold hidden sm:block">BlogCraft</div>
        </div>
        <div className="flex items-center gap-4">
            <Link to={'/blogs'} className=" font-medium bg-green-600 px-4 py-2 rounded-lg">← Go Back</Link>
            <button onClick={(e)=>{
                e.stopPropagation();
                profileVisible ? setProfileVisible(false) : setProfileVisible(true)
            }} className="min-h-10 max-h-10 min-w-10 max-w-10 bg-slate-600 rounded-full font-bold text-2xl flex justify-center items-center">{userName[0].toUpperCase()}</button>
        </div>
    </div>)
}