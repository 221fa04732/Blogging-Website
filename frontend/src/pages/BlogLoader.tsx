export default function BlogLoader(){

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

    
    return(<div className="flex flex-col sm:px-24 px-4 sm:mt-24 mt-20 w-full bg-stone-800 min-h-screen animate-pulse">
        <div className="w-full flex justify-end">
            <div className='bg-gray-600 h-24 sm:h-36 w-48 sm:w-80 rounded-md '></div>
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