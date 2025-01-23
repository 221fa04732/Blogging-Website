import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';
import BlogHeader from '../components/BlogHeader';
import Footer from '../components/Footer';
import { BlogLoaderatom } from '../Atoms/BlogLoader';
import { useRecoilState } from 'recoil';
import BlogLoader from './BlogLoader';
import Waiting from './Waiting';

export default function Blog(){

    const blogID = localStorage.getItem("blogID")
    const [blogloading , setblogLoading] = useRecoilState(BlogLoaderatom)
    const [userEmail, setUsermail] = useState('')
    const [userName, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [publishDate, setPublishdate] = useState('')

    const ModifiedUsername = Modified(userName)
    const ModifiedTitle = Modified(title)

    useEffect(() => {
    
        const fetchBlogs = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/unique/${blogID}`, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            });

            if (response.status === 200) {
              
                setUsermail(response.data.blog.author.email)
                setUsername(response.data.blog.author.name)
                setTitle(response.data.blog.title)
                setContent(response.data.blog.content)
                setPublishdate(response.data.blog.publishDate.toString())
            }

            else{
                console.log(response.data.msg)
            }
          } 
          catch (error) {
            console.error("Error fetching blogs:", error);
          }
          setblogLoading(false)

        };
    
        fetchBlogs();
    
      },[]); 

    return (<div className='bg-stone-800 min-h-screen text-white flex flex-col'>

        <div className='w-full flex justify-center border-b border-blue-500 fixed bg-stone-800 z-30'>
            <BlogHeader />
        </div>
        
        {(!blogloading ? ( userName === '' ? (<div className='flex justify-center'><Waiting /></div>) :
         
            (<div className="flex flex-col px-24 mt-16 w-full pt-8">
                <div className='flex flex-col items-end justify-center w-full gap-2'>
                    <div className='text-blue-500 text-4xl font-bold'>{ModifiedUsername}</div>
                    <div className='text-gray-400 tex-sm'>{userEmail}</div>
                    <div className='flex flex-col items-end text-gray-500 text-xs'>
                        <div>• {publishDate.slice(0,10)}</div>
                        <div>• {publishDate.slice(11,19)}</div>
                    </div>
                </div>
                <div className='text-4xl font-bold pt-8 w-9/12'>{ModifiedTitle}</div>
                <div style={{ whiteSpace: "pre-wrap" }} className='pt-10 px-5 w-11/12 text-stone-300'>{content}</div>
            </div> )) : 

            (<BlogLoader />)
         )}
        

        <div className='w-full flex justify-center mt-16'>
            <Footer />
        </div>

    </div>)
}


function Modified(userName :string){
    let actualUser = "";
    const tempUsername = userName.split(' ')

    for(let i=0;i<tempUsername.length;i++){
        const tempUsername2=tempUsername[i];
        if(tempUsername2[0]>='a' && tempUsername2[0]<='z'){
            actualUser+=tempUsername2[0].toUpperCase();
        }
        else{
            actualUser+=tempUsername2[0];
        }
        for(let j=1;j<tempUsername2.length;j++){
            if(tempUsername2[j]>='A' && tempUsername2[j]<='Z'){
                actualUser+=tempUsername2[j].toLowerCase();
            }
            else{
                actualUser+=tempUsername2[j];
            }
        }
        actualUser+=" ";
    }
    return actualUser;
}