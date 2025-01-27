import UpperCase from "../components/UpperCase"

export default function ProfileCard(){

    const name = localStorage.getItem("Loged-In-UserName") || ""
    const userName = UpperCase(name)
    const UserID = localStorage.getItem("Loged-In-UserId")
    const email = localStorage.getItem("Loged-In-UserEmail")


    return(<div className="bg-stone-800 flex flex-col w-11/12 sm:w-10/12 mt-36 pb-16 border-b border-blue-500">
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full mb-16">
            <div className="flex justify-center items-center">
                <img src="./random.png" className="sm:min-h-40 sm:min-w-40 sm:max-h-40 sm:max-w-40 min-h-20 min-w-20 max-h-20 max-w-20" />
            </div>
            <div className="flex flex-col justify-center col-span-2">
                <div className="text-6xl font-bold pb-4 ">{userName}</div>
                <div>BlogCraft ID : <span className="text-blue-600">{UserID}</span></div>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
            <div className="flex flex-col justify-center items-center">
            </div>
            <div className="flex flex-col justify-center items-start col-span-2 w-full">
                <div className="grid grid-cols-6 w-full text-gray-400 text-xl font-handwritten">
                    <div>
                        <div className="mb-2">Email</div>
                        <div className="mb-2">Post</div>
                        <div className="mb-2">Followers</div>
                    </div>
                    <div className="col-span-5">    
                        <div className="mb-2">{email}</div>
                        <div className="mb-2">Na</div>
                        <div className="mb-2">Na</div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}