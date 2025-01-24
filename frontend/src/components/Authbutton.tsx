import { useRecoilState } from "recoil"
import { SignLoaderatom } from "../Atoms/SignLoader"
import ButtonLoader from "./ButtonLoader" 

export default function Authbutton(props : {name : string, fun : ()=>void}){

    const [singloading, setSignloading] = useRecoilState(SignLoaderatom)
    return(<button className="bg-stone-800 text-white w-full py-1.5 rounded" 
        onClick={()=>{
            if(!singloading){
                props.fun()
                setSignloading(true)
            }
        }}>
        {singloading ? (<ButtonLoader name={"Please Wait"}/>) : props.name}
    </button>)
}