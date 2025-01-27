import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';
import BlogHeader from '../components/BlogHeader';
import Footer from '../components/Footer';
import { BlogLoaderatom } from '../Atoms/BlogLoader';
import { useRecoilState, useSetRecoilState } from 'recoil';
import BlogLoader from './BlogLoader';
import Waiting from './Waiting';
import UpperCase from '../components/UpperCase';
import { AlertMessageatom } from '../Atoms/AlertMessage';
import { IntlProvider, FormattedDate, FormattedTime  } from "react-intl";


export default function Blog(){

    const blogID = localStorage.getItem("Specific-Blog-Id")
    const [blogloading , setblogLoading] = useRecoilState(BlogLoaderatom)
    const [userEmail, setUsermail] = useState('')
    const [userName, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [publishDate, setPublishdate] = useState('')
    const setAlertMessage = useSetRecoilState(AlertMessageatom)
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const ModifiedUsername = UpperCase(userName)
    const ModifiedTitle = UpperCase(title)

    useEffect(() => {
    
        const fetchBlogs = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/unique/${blogID}`, {
              headers: {
                Authorization: localStorage.getItem("BlogCraft-Token"),
              },
            });

            if (response.status === 200) {
              
                setUsermail(response.data.blog.author.email)
                setUsername(response.data.blog.author.name)
                setTitle(response.data.blog.title)
                setContent(response.data.blog.content)
                setPublishdate(response.data.blog.publishDate.toString())
            }
          } 
          catch(e) 
          {
            setAlertMessage({
              show : true,
              message : "Internal Server Error",
              status : 404
            })
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
         
            (<div className='flex flex-col items-center w-full pt-8'>
              <div className="flex flex-col justify-center items-start sm:mt-16 mt-10 sm:w-10/12 w-11/12">
                <div className='flex justify-end w-full'>
                    <div className='flex flex-col items-end border sm:p-6 p-2  border-gray-700 rounded-md hover:border-gray-500 hover:shadow-black hover:shadow-lg'>
                      <div className='text-blue-500 sm:text-4xl text-xl font-bold pb-2'>{ModifiedUsername}</div>
                      <div className='text-gray-400 sm:text-lg text-sm pb-1'>{userEmail}</div>
                      <div className='flex flex-col items-end text-gray-500 text-xs'>
                          <div>
                            <IntlProvider locale="en" timeZone={userTimezone}>
                              <FormattedDate value={new Date(publishDate)}
                                month="short" 
                                day='2-digit'
                                year="numeric" />
                            </IntlProvider>
                          </div>
                          <div>
                            <IntlProvider locale="en" timeZone={userTimezone}>
                              <FormattedTime value={new Date(publishDate)} />
                            </IntlProvider>
                          </div>
                      </div>
                    </div>
                </div>
                <div className='sm:text-4xl text-xl font-bold pt-8 sm:pr-24'>{ModifiedTitle}</div>
                <div style={{ whiteSpace: "pre-wrap" }} className='py-10 text-stone-300 w-full sm:px-5 px-2'>{content}</div>
              </div> 
            </div>)) : 

            (<BlogLoader />)
         )}
        

        <div className='w-full flex justify-center mt-16'>
            <Footer />
        </div>

    </div>)
}