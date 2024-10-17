import React from 'react'

const TopContributor = (props) => {
    return (
        <div className="w-11/12 lg:w-3/5 lg:h-20 flex flex-col lg:flex-row bg-[#2A2A2A] rounded-xl px-4 lg:px-10 gap-4 lg:justify-between lg:items-center pt-3 pb-3">
            <div className='flex gap-6 items-center'>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#fff] flex justify-center items-center text-[#111] font-bold text-lg lg:text-2xl">{props.rank}</div>
                <h2 className="text-xl lg:text-2xl">{props.name}</h2>
            </div>
            <div className='text-lg lg:text-xl flex items-center gap-3'>
                Total Contributions : <span className="text-xl lg:text-2xl font-medium">{props.count}</span>
            </div>
        </div>
    )
}

export default TopContributor