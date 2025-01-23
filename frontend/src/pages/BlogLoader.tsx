export default function BlogLoader(){

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

    
    return(<div className="flex flex-col px-24 mt-24 w-full bg-stone-800 min-h-screen animate-pulse">
        <div className='flex flex-col items-end justify-center w-full gap-2'>
            <div className='bg-gray-600 h-10 w-3/12 pb-4'></div>
            <div className='bg-gray-600 h-5 w-2/12'></div>
            <div className='flex flex-col items-end text-gray-500 text-xs'>
                <div className="bg-stone-700 h-3 w-16 mb-2 rounded-sm"></div>
                <div className="bg-stone-700 h-3 w-16 mb-2 rounded-sm"></div>
            </div>
        </div>
        <div className='bg-gray-600 h-10 pt-8 w-9/12 mb-6 mt-10'></div>
        <div className='pt-10 px-5 w-11/12 bg-stone-600 h-24'></div>
        <div className='pt-10 px-5 w-11/12 bg-stone-600 h-16 mt-2'></div>
        <div className='pt-10 px-5 w-11/12 bg-stone-600 h-60 mt-2'></div>
        
    </div>)
}