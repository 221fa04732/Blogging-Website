import { Link } from "react-router-dom";

export default function BlogCard(
    props : {
        id : string,
        postDate : string,
        title : string,
        content : string,
        name : string
    }
){
    
    const newUserName : string = userNameSenCase(props.name);

    return (<div className="flex flex-col mt-8 mb-8 w-10/12 text-white p-8 border-b border-gray-500">
        <div className="flex items-center">
            <div className="rounded-full text-black bg-gray-400 max-h-8 min-h-8 max-w-8 min-w-8 flex items-center justify-center font-bold">{newUserName[0]}</div>
            <div className="pl-3 font-semibold text-2xl">{newUserName}</div>
            <div className="bg-gray-500 max-h-2 min-h-2 max-w-2 min-w-2 ml-16 rounded-full"></div>
            <div className="pl-1 text-gray-600 font-medium text-base">{props.postDate.slice(0,10)}</div>
        </div>
        <Link to={`/blog/${props.id}`} >
            <div className="mt-6 text-4xl font-bold pl-5 pr-16">{props.title}</div>
            <div className="mt-3 pl-5 font-sans text-lg text-gray-300 pr-16">{props.content.substring(0,800)}</div>
        </Link>
        <div className="text-sm text-gray-500 pt-8">{Math.ceil(props.content.trim().split(/\s+/).length/10)} min read</div>
        
    </div>)
}


function userNameSenCase(userName: string): string {
    let result = ""; 

    for (let i = 0; i < userName.length; i++) {
        if (i === 0 && userName[0] >= 'a' && userName[0] <= 'z') {
            result += userName[0].toUpperCase();
        } else if (userName[i] === ' ' && i + 1 < userName.length && userName[i + 1] >= 'a' &&userName[i + 1] <= 'z') {
            result += userName[i]; 
            result += userName[i + 1].toUpperCase();
            i++; 
        } else {
            result += userName[i];
        }
    }

    return result;
}
