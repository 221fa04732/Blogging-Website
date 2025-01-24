export default function BlogLoader(){

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

    
    return(<div className="flex flex-col sm:px-24 px-4 sm:mt-24 mt-20 w-full bg-stone-800 min-h-screen animate-pulse">
        <div className='flex flex-col items-end justify-center w-full gap-2'>
            <div className='bg-gray-600 sm:h-10 h-6 sm:w-3/12 w-5/12 pb-4'></div>
            <div className='bg-gray-600 sm:h-5 h-3 sm:w-2/12 w-3/12'></div>
            <div className='flex flex-col items-end text-gray-500 text-xs'>
                <div className="bg-stone-700 sm:h-3 h-2 sm:w-16 w-8 mb-2 rounded-sm"></div>
                <div className="bg-stone-700 sm:h-3 h-2 sm:w-16 w-8 mb-2 rounded-sm"></div>
            </div>
        </div>
        <div className='bg-gray-600 sm:h-10 h-6 pt-8 w-9/12 mb-6 mt-10'></div>
        <div className='w-11/12 bg-stone-600  h-16'></div>
        <div className='w-11/12 bg-stone-600  h-8 mt-2'></div>
        <div className='w-11/12 bg-stone-600 mt-2 h-4 sm:hidden'></div>
        <div className='w-11/12 bg-stone-600 mt-2 h-4 sm:hidden'></div>
        <div className='w-11/12 bg-stone-600 mt-2 h-16'></div>
        <div className='w-11/12 bg-stone-600 mt-2 h-16 sm:hidden'></div>
        <div className='w-11/12 bg-stone-600 mt-2 h-4'></div>
        <div className='w-11/12 bg-stone-600 mt-2 h-4'></div>
        <div className='w-11/12 bg-stone-600 h-16 mt-2'></div>
        
    </div>)
}