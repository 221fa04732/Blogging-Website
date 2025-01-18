export default function Authbutton(props : {name : string, fun : ()=>void}){
    return(<button className="bg-stone-800 text-white w-full py-1.5 rounded" 
        onClick={props.fun}>
        {props.name}
    </button>)
}