import React from 'react'

const Header = () => {
    return (
        <header className="flex h-18 bg-gray-200 body-font w-full">
            <nav className="bg-white shadow dark:bg-gray-800 w-full">
                <div className="container px-6 py-3 mx-auto md:flex">
                    <div className="w-full md:flex md:items-center md:justify-between">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>

                            <input type="text" className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header