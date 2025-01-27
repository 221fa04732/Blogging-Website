export default function Emailinput(props : {
    labelName : string,
    placeholder : string,
    onChange: (value : string) => void
}){
    return (<div className="flex flex-col justify-center w-full">
        <label className="font-semibold">{props.labelName}</label>
        <input className="bg-stone-800 p-2 border border-gray-500 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder={props.placeholder}
        onChange={(e)=>props.onChange(e.target.value)} type="text"></input>
    </div>)
}   