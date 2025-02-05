import { useRecoilState } from "recoil"
import { ShowPasswordatom } from "../Atoms/ShowPassword";

export default function ShowPassword(){

    const [visible, setVisible] = useRecoilState(ShowPasswordatom)

    return(<button
        onClick={()=>{
            visible === 0 ? setVisible(1) : setVisible(0)
        }}>
        {<img className='min-h-8 max-h-8 min-w-8 max-w-8 p-1' src={visible === 1 ? "/eye-solid.svg" : "/eye-slash-solid.svg"}/>}
    </button>)
}