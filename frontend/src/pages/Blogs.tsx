import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Loader from "./BlogsLoader";
import BlogsHeader from "../components/BlogsHeader";
import Post from "./Post";
import { PostVisibleatom } from "../Atoms/PostVisible";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Footer from "../components/Footer";
import { BlogsLoadingatom } from "../Atoms/BlogsLoader";
import Waiting from "./Waiting";
import { AlertMessageatom } from "../Atoms/AlertMessage";

type blogprop = {

  id: string;
  publishDate: Date;
  title: string;
  content: string; 
  author : {
    name : string
  }
};

export default function Blogs() {

  const postVisible = useRecoilValue(PostVisibleatom)
  const token = localStorage.getItem("Medium-Blog-Token");
  const [blogs, setBlogs] = useState<blogprop[]>([]);
  const [blogloading, setblogLoading] = useRecoilState(BlogsLoadingatom)
  const setAlertMessage = useSetRecoilState(AlertMessageatom)

  useEffect(() => {
    let intervalId;

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: token,
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
          message : "Server Error",
          status : 404
        })
      }
      setblogLoading(false)
    };

    fetchBlogs();

    intervalId = setInterval(fetchBlogs, 60000);

    return () => clearInterval(intervalId);

  }, [blogloading]); 

  return (<div className="bg-stone-800 min-h-screen flex flex-col items-center">
        <div className={`bg-stone-800 min-h-screen flex flex-col items-center ${postVisible === 1 ? "blur-sm" : "blur-none"} w-full`}>
          <div className="w-full min-h-16 max-h-16 fixed bg-stone-800 border-b border-blue-500 flex justify-center z-30">
            <BlogsHeader />
          </div>
          <div className="mt-16 flex flex-col items-center w-full min-h-screen">
            {!blogloading ? (blogs.length > 0 ? (
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
              <Waiting />
            )) : (
              < Loader />
            )}
          </div>
          <div className="w-full flex justify-center pt-8">
            <Footer />
          </div>
        </div>
        <div className={`bg-white ${postVisible === 1 ? "block" : "hidden"} fixed h-screen w-full md:w-10/12 rounded-lg z-30`}>
            <Post />
        </div>
    </div>
  );
}
