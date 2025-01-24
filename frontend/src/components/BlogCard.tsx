import { Link } from "react-router-dom";
import { BlogLoaderatom } from "../Atoms/BlogLoader";
import { useSetRecoilState } from "recoil";
import UpperCase from "./UpperCase";

export default function BlogCard(
    props : {
        id : string,
        postDate : string,
        title : string,
        content : string,
        name : string
    }
){
    
    const newUserName : string = UpperCase(props.name);
    const setblogLoading = useSetRecoilState(BlogLoaderatom)

    return (<div className="flex flex-col sm:mt-4 mt-1 mb-4 w-11/12 sm:w-10/12 text-white p-2 sm:p-8 border-b border-gray-500">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="rounded-full text-black bg-gray-400 flex items-center justify-center font-bold sm:h-8 sm:w-8 h-6 w-6 p-1">{newUserName[0]}</div>
                <div className="pl-3 font-semibold sm:text-2xl">{newUserName}</div>
            </div>
            <div className="flex items-center">
                <div className="bg-gray-500 max-h-2 min-h-2 max-w-2 min-w-2 rounded-full"></div>
                <div className="pl-1 text-gray-600 font-medium text-xs sm:text-base">{props.postDate.slice(0,10)}</div>
            </div>
        </div>
        <Link to={`/blog/${props.id}`} onClick={()=>{
            localStorage.setItem("Specific-Blog-Id", props.id)
            setblogLoading(true)
        }}>
            <div className="sm:mt-6 mt-4 sm:text-4xl  font-bold sm:pl-5 sm:pr-16 pl-3 pr-2">{props.title}</div>
            <div style={{ whiteSpace: "pre-wrap" }} className="sm:mt-3 mt-2 sm:pl-5 pl-4 sm:text-lg text-sm text-gray-300 sm:pr-16">{props.content.length > 300 ? props.content.substring(0, 300)+"..." : props.content}</div>
        </Link>
        <div className="sm:text-sm text-xs text-gray-500 sm:pt-8 pt-2">{Math.ceil(props.content.trim().split(/\s+/).length/10)} min read</div>
        
    </div>)
}