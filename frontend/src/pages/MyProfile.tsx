import BlogHeader from "../components/BlogHeader"
import Footer from "../components/Footer"
import ProfileCard from "../components/ProfileCard"
import EditProfile from "../components/EditProfile"
import { ProfileLoadingatom } from "../Atoms/ProfileLoader"
import { useRecoilValue } from "recoil"
import ProfileLoader from "./ProfileLoader"

export default function MyProfile(){

    const profileLoding = useRecoilValue(ProfileLoadingatom)
    
    return(<div className="bg-stone-800 min-hscreen flex flex-col items-center w-full text-white">
        <div className="fixed z-50 bg-stone-800 flex justify-center border-b border-blue-500 w-full">
            < BlogHeader />
        </div>

        <div className={`w-full flex flex-col items-center`}>
            {(profileLoding ? <ProfileLoader /> : 
                <div className="w-full flex flex-col items-center">
                <ProfileCard />
                <EditProfile />
            </div>)}
        </div>

        <div className="flex justify-center w-full sm:mt-16">
            < Footer />
        </div>
    </div>)
}