import Footer from "../components/Footer"
import BlogHeader from "../components/BlogHeader"
import { MyBlogLoaderatom } from "../Atoms/MyBlogLoader";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AlertMessageatom } from "../Atoms/AlertMessage";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import BlogCard from "../components/BlogCard";
import BlogNotfound from "./BlogNotfound";
import Loader from "./BlogsLoader";

type blogprop = {

    id: string;
    publishDate: Date;
    title: string;
    content: string; 
    author : {
      name : string
    }
  };

export default function MyBlog(){

    const [myBlogloader, setMyBlogloader] = useRecoilState(MyBlogLoaderatom)
    const setAlertMessage = useSetRecoilState(AlertMessageatom)
    const [blogs, setBlogs] = useState<blogprop[]>([]);


    useEffect(() => {
        let intervalId;
    
        const myBlog = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/my-blog`, {
                params: {
                    id: localStorage.getItem("Loged-In-UserId"),
                },
                headers: {
                    Authorization: localStorage.getItem("BlogCraft-Token"),
                },
            });
    
            if (response) {
              setBlogs(response.data.blog);
            }
    
          } 
          catch (error) 
          {
            setAlertMessage({
              show : true,
              message : "Internal Server Error",
              status : 404
            })
          }
          setMyBlogloader(false)

        };
    
        myBlog();
    
        intervalId = setInterval(myBlog, 60000);
    
        return () => clearInterval(intervalId);
    
    }, [myBlogloader]);

    return(<div className='bg-stone-800 min-h-screen text-white flex flex-col'>
    
        <div className='w-full flex justify-center border-b border-blue-500 fixed bg-stone-800 z-30'>
            <BlogHeader />
        </div>
        <div className="mt-16 flex flex-col items-center w-full min-h-screen">
            {!myBlogloader ? (blogs.length > 0 ? (
                [...blogs].reverse().map((blog) => (
                <BlogCard
                    key={blog.id}
                    id={blog.id}
                    postDate={blog.publishDate.toString()}
                    title={blog.title}
                    content={blog.content}
                    name={blog.author.name}
                />
                ))
            ) : (
                <BlogNotfound />
            )) : (
                < Loader />
            )}
        </div>
        <div className="w-full flex justify-center pt-8"><Footer /></div>        
    </div>)
}