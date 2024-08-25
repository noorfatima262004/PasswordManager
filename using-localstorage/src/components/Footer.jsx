import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full min-h-[15vh]'>
            <div className="logo font-bold text-white text-2xl mb-2">
                <span className='text-green-500'> &lt;</span>
                <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
            </div>

            <div className='flex justify-center items-center '> Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by Noor Fatima </div>
        </div>
    )
}

export default Footer