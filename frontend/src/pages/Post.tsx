import { useRecoilState, useSetRecoilState } from "recoil"
import { PostVisibleatom } from "../Atoms/PostVisible"
import { Postloaderatom } from "../Atoms/Postloader"
import { useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../config"
import { BlogsLoadingatom } from "../Atoms/BlogsLoader"
import UpperCase from "../components/UpperCase"


export default function Post(){

    const userName = UpperCase(localStorage.getItem("Loged-In-UserName") || "guest")
    const setPostVisible = useSetRecoilState(PostVisibleatom)
    const setblogsLoading = useSetRecoilState(BlogsLoadingatom)
    const [postloading, setPostloading] = useRecoilState(Postloaderatom)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    return(<div className="flex flex-col items-center h-full bg-stone-700 ">

        <header className="flex justify-between items-center py-2 w-11/12">
            <div className="flex items-center gap-4">
                <div className="min-h-8 max-h-8 min-w-8 max-w-8 bg-slate-600 rounded-full font-bold text-xl flex justify-center items-center text-white">{userName[0]}</div>
                <div className="text-3xl font-semibold hidden sm:block text-white">{userName}</div>
            </div>
            <div className="flex items-center">
                <button onClick={()=>{
                    if(!postloading){
                        blogPost(title, content, setTitle, setContent, setPostloading,setPostVisible, setblogsLoading)
                        setPostloading(true)
                    }
                }} className="font-medium bg-green-600 px-4 py-2 rounded-lg mr-4">
                    <div className="rounded-lg text-white">{postloading ? "Publishing..." : "Publish Your Blog"}</div> 
                </button>
                <button onClick={()=>{
                    setPostVisible(0);
                }}><img className="max-h-8 max-w-8 min-h-8 min-w-8" src="cross.svg" /></button>
            </div>
            
        </header>

        <input className="w-11/12 sm:mt-6 mt-2 outline-none sm:text-2xl text-xl bg-stone-700 text-white" 
            placeholder="What do you want to talk about?"
            value={title}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}
            style={{ whiteSpace: "pre-wrap" }}
        ></input>

        <textarea className="w-11/12 h-full sm:text-base text-sm my-4 outline-none bg-stone-700 text-white"
            placeholder="Start writing your blog"
            value={content}
            onChange={(e)=>{
                setContent(e.target.value)
            }}
            style={{ whiteSpace: "pre-wrap" }}
        ></textarea>

    </div>)
}


async function blogPost(title : string, content : string, setTitle : any, setContent : any, setPostloading : any, setPostVisible : any, setblogsLoading : any){

    try{
        const createPost = await axios.post(`${BACKEND_URL}/api/v1/blog/new-post`,{
            title : title,
            content : content,
        },{
            headers:{
                Authorization : localStorage.getItem("Medium-Blog-Token")
            }
        })

        if(createPost.status === 200){
            setTitle('')
            setContent('')
            setblogsLoading(true)
            setPostVisible(0)
        }
        console.log(createPost.data.msg);
    }
    catch(e){
        console.log("Server Error")
    }

    setPostloading(false)

}