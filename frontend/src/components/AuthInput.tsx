export default function Authinput(props : {
    labelName : string,
    placeholder : string,
    onChange: (value : string) => void
    type? : string
}){
    return (<div className="flex flex-col justify-center w-full">
        <label className="font-semibold">{props.labelName}</label>
        <input className="p-1 pl-2 border border-black rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder={props.placeholder}
        onChange={(e)=>props.onChange(e.target.value)} type={props.type || "text"}></input>
    </div>)
}   