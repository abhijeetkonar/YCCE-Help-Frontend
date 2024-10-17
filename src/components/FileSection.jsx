import React from 'react'

const FileSection = (props) => {
    const handleDelete = () => {
        if (props.icon === 'delete') {
            props.handleDelete(props.fileName, props.id);
        }
    }
    return (
        <div className="flex lg:flex-row flex-col justify-between rounded-xl bg-[#2A2A2A] px-6 py-3 gap-8">
            <div className="left flex flex-col lg:gap-2 gap-4">
                <div className="flex gap-3">
                    <p className="text-primary">Course Name :</p>
                    <h5 className='lg:text-lg font-semibold'>{props.courseName}</h5>
                </div>
                <div className="flex gap-3">
                    <p className="text-primary">Department :</p>
                    <h5 className='lg:text-lg font-semibold'>{props.department}</h5>
                </div>
                <div className="flex gap-3">
                    <p className="text-primary">{`${props.value}`}</p>
                    <h5 className='lg:text-lg font-semibold'>{props.paperType}</h5>
                </div>
            </div>
            <div className="right flex flex-col items-center gap-2">
                {props.icon === 'delete' ? 
                    <button onClick={handleDelete}>
                        <img src={`./${props.icon}.png`} alt='delete' className='w-16' />
                    </button> :
                    <button>
                        <a className='cursor-pointer' href={props.fileUrl} target="_blank"><img src={`./${props.icon}.png`} alt='download' className='w-16' /></a>
                    </button>
                }
                <a className='cursor-pointer' href={props.linkedinUrl} target="_blank">
                    <div className="text-sm">Contribute by <span className="text-[#9146ec]">{props.contributedBy}</span> on <span className="text-[#835BB3]">
                        {new Date(props.contributionDate).toLocaleDateString('en-GB')}</span>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default FileSection