import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Loader from "./Loader";

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
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState<blogprop[]>([]);

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
    };

    fetchBlogs();

    intervalId = setInterval(fetchBlogs, 60000);

    return () => clearInterval(intervalId);
  }, [token]); 

  return (
    <div className="bg-stone-800 min-h-screen flex flex-col items-center">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
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
  );
}
