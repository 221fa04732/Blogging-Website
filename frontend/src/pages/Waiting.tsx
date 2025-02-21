import UpperCase from "../components/UpperCase";
import { Useratom } from "../Atoms/User";
import { useRecoilValue } from "recoil";


export default function Waiting(){

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

    const userinfo = useRecoilValue(Useratom)
    const UserName = userinfo.name
    const firstserName = UserName?.split(' ')[0] || "guest"
    const firstserNameUppercae = UpperCase(firstserName)


    return (<div className="sm:w-10/12 w-11/12 flex flex-col items-center justify-center min-h-screen text-white gap-2">
        <img className="min-h-8 max-h-8 min-w-8 max-w-8 mb-6" src="/loading.gif"/>
        <div>Thanks {firstserNameUppercae} for your patience ❤️</div>
        <div>Feel free to refresh 🔄 the page if needed</div>
    </div>)
}