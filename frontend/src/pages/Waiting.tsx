export default function Waiting(){

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

    
    return (<div className="w-10/12 flex flex-col items-center justify-center min-h-screen text-white gap-2">
        <div>Thanks for your patience ❤️</div>
        <div>Feel free to refresh 🔄 the page if needed</div>
    </div>)
}