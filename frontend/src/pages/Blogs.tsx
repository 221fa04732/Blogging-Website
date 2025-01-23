import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Loader from "./Loader";
import Header from "../components/Header";
import Post from "./Post";
import { PostVisible } from "../Atoms/PostVisible";
import { useRecoilState, useRecoilValue } from "recoil";
import Footer from "../components/Footer";
import { Loading } from "../Atoms/Loading";

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

  const postVisible = useRecoilValue(PostVisible)
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState<blogprop[]>([]);
  const [loading, setLoading] = useRecoilState(Loading)

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
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false)
    };

    fetchBlogs();

    intervalId = setInterval(fetchBlogs, 60000);

    return () => clearInterval(intervalId);

  }, [loading]); 

  return (<div className="bg-stone-800 min-h-screen flex flex-col items-center">
        <div className={`bg-stone-800 min-h-screen flex flex-col items-center ${postVisible === 1 ? "blur-sm" : "blur-none"} w-full`}>
          <div className="w-full min-h-16 max-h-16 fixed bg-stone-800 border-b border-blue-500 flex justify-center">
            <Header />
          </div>
          <div className="mt-16 flex flex-col items-center w-full">
            {!loading ? (
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
              < Loader />
            )}
          </div>
          <div className="w-full flex justify-center">
            <Footer />
          </div>
        </div>
        <div className={`bg-white ${postVisible === 1 ? "block" : "hidden"} fixed h-screen w-full md:w-10/12 rounded-lg z-30`}>
            <Post />
        </div>
    </div>
  );
}
