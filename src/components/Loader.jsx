import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='w-screen h-screen bg-[rgb(26,26,26)] flex justify-center items-center'>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#BB86FC"
                secondaryColor="#03DAC6"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader