import React from 'react'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
            <div className="container">
                <div className="flex justify-center">
                    <div className="w-full lg:w-8/12 text-center">
                        <div className="text-404">
                            <b className="text-transparent bg-clip-text bg-gradient-to-r from-[#BB86FC] to-[#03DAC6] text-[200px] leading-[200px] tracking-wider lg:text-[200px] sm:text-[150px] xs:text-[120px]">404</b>
                        </div>
                        <div className="mt-0 text-white text-[20px] tracking-widest">
                            <b>PAGE NOT FOUND</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound