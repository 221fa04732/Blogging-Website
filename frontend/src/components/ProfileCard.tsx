import UpperCase from "../components/UpperCase"

export default function ProfileCard(){

    const name = localStorage.getItem("Loged-In-UserName") || ""
    const userName = UpperCase(name)
    const UserID = localStorage.getItem("Loged-In-UserId")
    const email = localStorage.getItem("Loged-In-UserEmail")


    return(<div className="bg-stone-800 flex flex-col w-11/12 sm:w-10/12 mt-20 sm:mt-36 sm:pb-16 pb-6 border-b border-blue-500">
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full sm:mb-16 mb-8">
            <div className="flex justify-center items-center">
                <img src="./random.png" className="sm:min-h-40 sm:min-w-40 sm:max-h-40 sm:max-w-40 min-h-16 min-w-16 max-h-16 max-w-16" />
            </div>
            <div className="flex flex-col justify-center items-center sm:items-start col-span-2">
                <div className="sm:text-6xl text-2xl font-bold sm:pb-4 pb-1">{userName}</div>
                <div className="text-xs sm:text-base">BlogCraft ID : <span className="text-blue-600">{UserID}</span></div>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
            <div className="flex flex-col justify-center items-center">
            </div>
            <div className="flex flex-col justify-center items-start col-span-2 w-full">
                <div className="grid sm:grid-cols-6 grid-cols-4 w-full text-gray-400 sm:text-xl text-sm font-handwritten">
                    <div>
                        <div className="mb-2">Email</div>
                        <div className="mb-2">Post</div>
                        <div className="mb-2">Followers</div>
                    </div>
                    <div className="sm:col-span-5 col-span-3">    
                        <div className="mb-2">{email}</div>
                        <div className="mb-2">Na</div>
                        <div className="mb-2">Na</div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}