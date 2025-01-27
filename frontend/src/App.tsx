import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AlertMessage from './components/AlertMessage'
import Profile from './components/Profile'
import { AlertMessageatom } from './Atoms/AlertMessage'
import { useRecoilValue } from 'recoil'
import UnAuthorized from './pages/UnAuthorized'
import { Profileatom } from './Atoms/Profile'


const Signup = lazy(()=> import('./pages/Signup'))
const Signin = lazy(()=> import('./pages/Signin'))
const Blog = lazy(()=> import('./pages/Blog'))
const Blogs = lazy(()=> import('./pages/Blogs'))
const MyBlog = lazy(()=> import('./pages/MyBlog'))
const MyProfile = lazy(()=> import('./pages/MyProfile'))


function App() {

  const alertMessage = useRecoilValue(AlertMessageatom)
  const profileVisible = useRecoilValue(Profileatom)

  return (
    <>

    {/* alert message component */}
      <div className={`fixed z-50 right-0 bottom-2 ${alertMessage.show ? "block" : "hidden"}`}>
        <AlertMessage />
      </div>

    {/* profile component */}
      <div className={`fixed z-50 right-1 top-16 ${profileVisible ? "block" : "hidden"}`}>
        < Profile />
      </div>

        <Suspense>
          <Routes>

        {/* un-protected route */}
            <Route index element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />


        {/* protected route */}

            <Route path='/blog/*' 
              element={
                <UnAuthorized>
                  <Blog />
                </UnAuthorized>
              }
            />

            <Route path="/blogs" 
              element={
                <UnAuthorized>
                  <Blogs />
                </UnAuthorized>
              } 
            />

            <Route path="/my-blog" 
              element={
                <UnAuthorized>
                  <MyBlog />
                </UnAuthorized>
              } 
            />

            <Route path="/my-profile" 
              element={
                <UnAuthorized>
                  <MyProfile />
                </UnAuthorized>
              } 
            />

          </Routes>
        </Suspense>
    </>
  )
}

export default App