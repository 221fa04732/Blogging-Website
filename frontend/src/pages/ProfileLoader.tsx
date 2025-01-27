export default function ProfileLoader() {
    return (
      <>
        <div className="bg-stone-800 flex flex-col w-11/12 sm:w-10/12 sm:mt-36 mt-20 pb-16 border-b border-blue-500 animate-pulse mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 w-full mb-16">
            <div className="flex justify-center items-center">
              <div className="sm:min-h-40 sm:min-w-40 sm:max-h-40 sm:max-w-40 min-h-24 min-w-24 max-h-24 max-w-24 bg-gray-700 rounded-full"></div>
            </div>
            <div className="flex flex-col justify-center sm:items-start items-center col-span-2 space-y-4 sm:space-y-6 mt-6 sm:mt-0">
              <div className="bg-gray-700 h-8 sm:h-12 w-3/4 rounded-md "></div>
              <div className="bg-gray-700 h-6 w-1/2 sm:w-1/3 rounded-md"></div>
            </div>
          </div>
  
          {/* Profile Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
            <div className="flex flex-col justify-center items-center"></div>
            <div className="flex flex-col justify-center items-start col-span-2 w-full">
              <div className="grid grid-cols-6 w-full text-xl">
                <div>
                  <div className="bg-gray-700 h-6 w-20 sm:w-24 mb-4 rounded-md"></div>
                  <div className="bg-gray-700 h-6 w-20 sm:w-24 mb-4 rounded-md"></div>
                  <div className="bg-gray-700 h-6 w-20 sm:w-24 mb-4 rounded-md"></div>
                </div>
                <div className="col-span-5">
                  <div className="bg-gray-700 h-6 w-3/4 sm:w-5/6 mb-4 rounded-md"></div>
                  <div className="bg-gray-700 h-6 w-3/4 sm:w-5/6 mb-4 rounded-md"></div>
                  <div className="bg-gray-700 h-6 w-3/4 sm:w-5/6 mb-4 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Profile Settings Section */}
        <div className="bg-stone-800 mt-16 w-11/12 sm:w-10/12 flex flex-col items-center font-handwritten animate-pulse mx-auto">
          {/* Update Username Fieldset */}
          <fieldset className="border border-gray-600 w-full sm:w-11/12 mb-16 flex flex-col justify-center p-6">
            <legend className="bg-gray-700 h-6 w-24 sm:w-36 rounded-md mb-4"></legend>
            <div className="bg-gray-700 h-6 w-3/4 sm:w-5/6 rounded-md mb-6"></div>
            <div className="bg-gray-700 h-6 w-1/2 sm:w-1/3 rounded-md mb-2"></div>
            <div className="bg-gray-700 h-10 w-full sm:w-5/6 rounded-md mb-8"></div>
            <div className="flex justify-center w-full">
              <div className="bg-gray-700 h-10 w-24 rounded-md"></div>
            </div>
          </fieldset>
        </div>
      </>
    );
  }
  