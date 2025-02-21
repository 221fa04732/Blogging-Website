import LandingHeader from "../components/LandingHeader";
import { Link } from "react-router-dom";

export default function LandingPage(){

    return(<div className="bg-slate-800 flex flex-col items-center w-full min-h-screen">
        
        <div className="w-full flex justify-center border-b">
            <LandingHeader />
        </div>

        <div className="m-10 text-2xl p-2 bg-green-500 rounded-md">
            <Link to={'/blogs'}>Start reading</Link>
        </div>

    </div>)
}