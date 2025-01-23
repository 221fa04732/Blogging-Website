import { useSetRecoilState } from "recoil"
import { PostVisibleatom } from "../Atoms/PostVisible"

export default function BlogsHeader(){

    const userName = localStorage.getItem("Loged-In-UserName") || "guest"
    const postVisible = useSetRecoilState(PostVisibleatom);

    return(<div className="h-16 flex text-white items-center justify-between w-10/12">
        <div className="flex items-center gap-4">
            <img className="min-h-10 max-h-10 min-w-10 max-w-10" src="/blog.png"/>
            <div className="text-3xl font-semibold hidden sm:block">Medium-Blog</div>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={()=>{
                postVisible(1);
            }} className=" font-medium bg-green-600 px-4 py-2 rounded-lg">Create New Post</button>
            <div className="min-h-10 max-h-10 min-w-10 max-w-10 bg-slate-600 rounded-full font-bold text-2xl flex justify-center items-center">{userName[0].toUpperCase()}</div>
        </div>
    </div>)
}