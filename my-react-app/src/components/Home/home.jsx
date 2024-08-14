import React from 'react'
import Header from '../header/header'


export default function Home() {
    return (
        <>
            <Header></Header>
            <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen banner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mt-48">
                            <h1 className="text-slate-300 text-3xl py-3 font-bold ">Manage Your Daily Tasks </h1>
                            <p className='w-1/2 text-center m-auto'>Take control of your day and achieve your goals with ease.</p>
                            <div className="text-center pt-2">
                                <a href="/register" className='transition-all d-inline-block py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75'>Get started For Free</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
