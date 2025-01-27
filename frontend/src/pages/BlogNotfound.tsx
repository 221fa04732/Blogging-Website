import UpperCase from "../components/UpperCase";


export default function BlogNotfound(){

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

    const UserName = localStorage.getItem("Loged-In-UserName")
    const firstserName = UserName?.split(' ')[0] || "guest"
    const firstserNameUppercae = UpperCase(firstserName)


    return (<div className="sm:w-10/12 w-11/12 flex flex-col items-center justify-center min-h-screen text-white gap-2">
        <div className="text-2xl pb-6">Blog Not Found 😔</div>
        <div>Thanks {firstserNameUppercae} for your patience ❤️</div>
        <div>Feel free to refresh 🔄 the page if needed</div>
    </div>)
}