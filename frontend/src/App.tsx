import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const Signup = lazy(()=> import('./pages/Signup'))
const Signin = lazy(()=> import('./pages/Signin'))
const Blog = lazy(()=> import('./pages/Blog'))
const Blogs = lazy(()=> import('./pages/Blogs'))
import AlertMessage from './components/AlertMessage'
import { AlertMessageatom } from './Atoms/AlertMessage'
import { useRecoilValue } from 'recoil'

function App() {

  const alertMessage = useRecoilValue(AlertMessageatom)

  return (
    <>
      <div className={`fixed z-50 right-0 top-16 ${alertMessage.show ? "block" : "hidden"}`}>
        <AlertMessage />
      </div>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route index element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/*" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App