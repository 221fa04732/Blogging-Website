import Quote from '../components/Quote'
import Authbutton from '../components/Authbutton'
import Emailinput from '../components/EmailInput'
import Passwordinput from '../components/PasswordInput'
import { userSignupType } from '@kumarmrityunjay/medium-package'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { SignLoaderatom } from '../Atoms/SignLoader'
import { useSetRecoilState } from 'recoil'
import { AlertMessageatom } from '../Atoms/AlertMessage'


export default function Signup(){

    const navigate = useNavigate();
    const [signupValue, setSignupValue] = useState<userSignupType>({
        email : "",
        password : "",
        name : ""
    })
    const setSignloading = useSetRecoilState(SignLoaderatom)
    const setAlertMessage = useSetRecoilState(AlertMessageatom)

    async function signUp(){
        
        try{
            const data = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupValue)
            if(data.status===200){
                const token = data.data.token;
                localStorage.setItem('Medium-Blog-Token',`Barrer ${token}`)
                localStorage.setItem("Loged-In-UserName", data.data.name || "guest")
                localStorage.setItem("Loged-In-UserEmail", data.data.email || "guest@gmail.com")
                localStorage.setItem("Loged-In-UserId", data.data.id || "123456")
                navigate('/blogs')
            }
            setAlertMessage({
                show : true,
                message : data.data.msg,
                status : data.status
            })
        }
        catch(e){
            setAlertMessage({
                show : true,
                message : "Internal Server Error",
                status : 404
            })
        }
        setSignloading(false)
    }
    
    const handleInputChange = (field: keyof userSignupType, value: string) => {
        setSignupValue((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    return (<div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='h-screen flex flex-col justify-center items-center'>

            <div className='font-bold text-4xl mb-1 font-sans'>
                Create an account
            </div>

            <div className='text-gray-500 mb-3'>
                Already have an account ? 
                <Link className='pl-3 underline text-blue-600' to={'/signin'}>SignIn</Link>
            </div>

            <div className='w-10/12 sm:w-8/12'>
                <div className='mt-3'>
                    <Emailinput labelName='UserName'  placeholder='Mrityunjay Kumar'
                    onChange={(value) => handleInputChange('name', value)}/>
                </div>

                <div className='mt-3'>
                    <Emailinput labelName='Email'  placeholder='mrityunjaykumar@gmail.com'
                    onChange={(value) => handleInputChange('email', value)}/>
                </div>
                
                <div className='mt-3'>
                    <Passwordinput labelName='Password'  placeholder='12345678'
                    onChange={(value) => handleInputChange('password', value)}/>
                </div>

                <div className='text-red-600 text-sm'>Password must be greater than 8</div>

                <div className='mt-3'>
                    <Authbutton name='Sign Up' fun={signUp} />
                </div>
            </div>

        </div>  

        <div className='hidden md:block'>
            <Quote />  
        </div>    
        
    </div>)
} 
