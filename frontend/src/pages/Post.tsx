import { useSetRecoilState } from "recoil"
import { PostVisible } from "../Atoms/PostVisible"


export default function Post(){

    const userName = modifyName(localStorage.getItem("userName") || "Anonymous")
    const postVisible = useSetRecoilState(PostVisible)

    return(<div className="flex flex-col items-center h-full bg-stone-700 border border-blue-500">
        <header className="flex justify-between items-center py-2 w-11/12">
            <div className="flex items-center gap-4">
                <div className="min-h-8 max-h-8 min-w-8 max-w-8 bg-slate-600 rounded-full font-bold text-xl flex justify-center items-center text-white">{userName[0]}</div>
                <div className="text-3xl font-semibold hidden sm:block text-white">{userName}</div>
            </div>
            <div className="flex items-center">
                <button onClick={()=>{
                    blogPost()
                }} className=" bg-green-600 px-4 py-1 rounded-md mr-6">
                    <div className=" font-medium rounded-lg text-xl text-white">Upload & Publish</div> 
                </button>
                <button onClick={()=>{
                    postVisible(0);
                }}><img className="max-h-8 max-w-8 min-h-8 min-w-8" src="cross.svg" /></button>
            </div>
            
        </header>

        <input className="w-11/12 mt-6 outline-none text-2xl bg-stone-700 text-white" 
            placeholder="What do you want to talk about?">
        </input>

        <textarea className="w-11/12 h-full my-4 outline-none bg-stone-700 text-white"
            placeholder="Start writing your blog">
        </textarea>

    </div>)
}


function blogPost(){

}


function modifyName(user : string){
    const tempUser = user.split(' ')[0];
    let actualUser = "";

    if(tempUser[0]>='a' && tempUser[0]<='z'){
        actualUser+=tempUser[0].toUpperCase();
    }
    else{
        actualUser+=tempUser[0]
    }

    for(let i=1;i<tempUser.length;i++){
        if(tempUser[i]>='A' && tempUser[i]<='Z'){
            actualUser+=tempUser[i].toLowerCase();
        }
        else{
            actualUser+=tempUser[i]
        }
    }

    if(user.split(' ')[1]){
        actualUser+=" ";
        const tempUser2 = user.split(' ')[1];
        if(tempUser2[0]>='a' && tempUser2[0]<='z'){
            actualUser+=tempUser2[0].toUpperCase();
        }
        else{
            actualUser+=tempUser2[0]
        }
    
        for(let i=1;i<tempUser2.length;i++){
            if(tempUser2[i]>='A' && tempUser2[i]<='Z'){
                actualUser+=tempUser2[i].toLowerCase();
            }
            else{
                actualUser+=tempUser2[i]
            }
        }
    }

    return actualUser;
}
