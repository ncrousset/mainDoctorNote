import React from 'react'

const LoginForm = () => {
    return (
        <form method="#" action="#" className="mt-10">
            <div>
                <input type="email" placeholder="Correo electronico" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-2 hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
            </div>
            <div class="mt-7">
                <input type="password" placeholder="Contraseña" className="mt-1 block w-full border-none bg-gray-100 h-11 pl-2 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
            </div>

            <div className="mt-7 flex">
                <label for="remember_me" className="inline-flex items-center w-full cursor-pointer">
                    <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                    <span class="ml-2 text-sm text-gray-600">
                        Recuerdame
                    </span>
                </label>

                <div className="w-full text-right">
                    <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                        ¿Olvidó su contraseña?
                    </a>
                </div>
            </div>

            <div className="mt-7">
                <button className="bg-green-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Login
                </button>
            </div>

            <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
            </div>

            <div className="mt-7">
                <div className="flex justify-center items-center">
                    <label className="mr-2" >¿Eres nuevo? </label>
                    <a href="#" className=" text-green-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                        Crea una cuenta
                    </a>
                </div>
            </div>
        </form>
    )
}

export default LoginForm
