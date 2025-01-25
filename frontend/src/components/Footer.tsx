export default function Footer(){
    return(<div className="flex flex-col items-center border-t border-blue-500 bg-stone-800 w-11/12 sm:w-10/12 pt-6 pb-10 text-gray-500 text-sm gap-1">
        <div>Made with ❤️ - Mrityunjay Kumar</div>
        <div className="flex items-center">
            <div>Want to contribute?</div>
            <a href="https://github.com/221fa04732/Blogging-Website" target="_blank" ><img src="/github.png" className="min-h-4 min-w-4 max-h-4 max-w-4 mx-2" /></a>
            <div>Welcome!</div>
        </div>
        <div>Thanks for visiting and happy coding!</div> 
        <div className="pt-6">© Copyright 2025. All rights reserved.</div>
    </div>)
}