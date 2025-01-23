import { Link } from "react-router-dom";


export default function BlogHeader(){

    const userName = localStorage.getItem("Loged-In-UserName") || "guest"

    return(<div className="h-16 flex text-white items-center justify-between w-10/12">
        <div className="flex items-center gap-4">
            <img className="min-h-10 max-h-10 min-w-10 max-w-10" src="/blog.png"/>
            <div className="text-3xl font-semibold hidden sm:block">Medium-Blog</div>
        </div>
        <div className="flex items-center gap-4">
            <Link to={'/blogs'} className=" font-medium bg-green-600 px-4 py-2 rounded-lg">← Go Back</Link>
            <div className="min-h-10 max-h-10 min-w-10 max-w-10 bg-slate-600 rounded-full font-bold text-2xl flex justify-center items-center">{userName[0].toUpperCase()}</div>
        </div>
    </div>)
}