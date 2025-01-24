export default function ButtonLoader(props :{
    name : string
}){
    return(<div className="flex items-center justify-center">
        <div>{props.name}</div>
        <img src="/loading.gif" className="max-h-4 max-w-4 min-h-4 min-w-4 ml-2"/>
    </div>)
}