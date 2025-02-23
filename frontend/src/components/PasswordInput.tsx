import ShowPassword from "./ShowPassword"
import { ShowPasswordatom } from "../Atoms/ShowPassword"
import { useRecoilValue } from "recoil"

export default function Passwordinput(props : {
    labelName : string,
    placeholder : string,
    onChange: (value : string) => void
}){

    const visible = useRecoilValue(ShowPasswordatom)

    return (<div className="flex flex-col justify-center w-full">
        <label className="font-semibold">{props.labelName}</label>
        <div tabIndex={0} className="bg-stone-800 border border-gray-500 rounded focus-within:outline-none focus-within:border-blue-500 flex">
            <input className="bg-stone-800 p-2 focus:outline-none w-full rounded" placeholder={props.placeholder}
            onChange={(e)=>props.onChange(e.target.value)} type={visible === 0 ? "password" : "text"}></input>

            <ShowPassword />

        </div>
    </div>)
}   