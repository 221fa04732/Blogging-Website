import Quote from '../components/Quote'
import Authbutton from '../components/Authbutton'
import Authinput from '../components/AuthInput'
import { userSigninType } from '@kumarmrityunjay/medium-package'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'


export default function Signin(){

    const navigate = useNavigate();
    const [signinValue, setSigninValue] = useState<userSigninType>({
        email : "",
        password : "",
    })

    async function signIn(){
    
        try{
            const data = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinValue)
            const token = data.data.token;
            localStorage.setItem('token', token)
            navigate('/blogs')
        }
        catch(e){
            alert('Error while signin')
        }
        
    }
    
    const handleInputChange = (field: keyof userSigninType, value: string) => {
        setSigninValue((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    return (<div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='h-screen flex flex-col justify-center items-center'>

            <div className='font-bold text-4xl mb-1 font-sans'>
                Welcome, User
            </div>

            <div className='text-gray-500 mb-3'>
                Create an account ? 
                <Link className='pl-3 underline' to={'/signup'}>SignUp</Link>
            </div>

            <div className='w-8/12'>

                <div className='mt-3'>
                    <Authinput labelName='Email'  placeholder='mrityunjaykumar@gmail.com'
                    onChange={(value) => handleInputChange('email', value)}/>
                </div>
                
                <div className='mt-3'>
                    <Authinput labelName='Password'  placeholder='123456'
                    onChange={(value) => handleInputChange('password', value)} type="password"/>
                </div>

                <div className='mt-3'>
                    <Authbutton name='Sign In' fun={signIn} />
                </div>
            </div>

        </div>  

        <div className='hidden md:block'>
            <Quote />  
        </div>    
        
    </div>)
} 
