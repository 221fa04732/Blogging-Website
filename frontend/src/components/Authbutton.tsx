import { useRecoilValue } from "recoil"
import { SignLoaderatom } from "../Atoms/SignLoader"
import ButtonLoader from "./ButtonLoader" 

export default function Authbutton(props : {name : string, fun : ()=>void}){

    const singloading = useRecoilValue(SignLoaderatom)
    return(<button className="text-white w-full py-2 rounded shadow-stone-950 hover:shadow-black shadow-sm hover:shadow-md " 
        onClick={()=>{
            if(!singloading){
                props.fun()
            }
        }}>
        {singloading ? (<ButtonLoader name={"Please Wait"}/>) : props.name}
    </button>)
}