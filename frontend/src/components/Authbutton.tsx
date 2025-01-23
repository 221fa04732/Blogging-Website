import { useRecoilState } from "recoil"
import { SignLoader } from "../Atoms/SignLoader" 

export default function Authbutton(props : {name : string, fun : ()=>void}){

    const [singloading, setSignloading] = useRecoilState(SignLoader)
    return(<button className="bg-stone-800 text-white w-full py-1.5 rounded" 
        onClick={()=>{
            if(!singloading){
                props.fun()
                setSignloading(true)
            }
        }}>
        {singloading ? "Please Wait..." : props.name}
    </button>)
}