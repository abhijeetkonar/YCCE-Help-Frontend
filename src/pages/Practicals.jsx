import React, { useEffect, useState } from 'react'
import FileSection from '../components/FileSection'
import SearchBox from '../components/SearchBox'
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'

const Practicals = () => {
  const [currPage, setCurrPage] = useState(1);
  const [practicals, setPracticals] = useState([]);
  const [nbHits, setNbHits] = useState(0);
  const [totalDoc, setTotalDoc] = useState(1);
  const [pages, setPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://ycce-help-backend.onrender.com/practicals?page=${currPage}&search=${searchQuery.toLowerCase()}`)
      .then((res) => {
        setPracticals(res.data.myPracticals);
        setNbHits(res.data.nbHits);
        setTotalDoc(res.data.totalDoc);
        setPages(Math.ceil(res.data.totalDoc / 10));
        setIsLoading(false);
      })
  }, [currPage, searchQuery]);


  const handelPrev = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  }

  const handelNext = () => {
    if (currPage < pages) {
      setCurrPage(currPage + 1);
    }
  }

  const sendQueryToParent = (query) => {
    setSearchQuery(query);
  }

  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className='flex flex-col min-h-screen px-4 lg:px-36 w-full mt-8'>
      <div className='flex lg:flex-row flex-col justify-between gap-5'>
        <h3 className="text-xl lg:text-2xl text-secondary">Practicals</h3>
        <div>
          <SearchBox sendQueryToParent={sendQueryToParent} />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-8 lg:px-20 mt-10 mb-10">
        {isLoading ?
          <div className='flex justify-center items-center'>
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#BB86FC"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div> :
          <>
            {practicals.map((practical) => (
              <FileSection 
                key={practical._id} 
                value="Practical No : " 
                icon="download" 
                courseName={capitalizeFirstLetter(practical.courseName)} 
                paperType={capitalizeFirstLetter(practical.practicalNo)} 
                department={capitalizeFirstLetter(practical.department)} 
                contributedBy={practical.contributedBy.username} 
                contributionDate={practical.contributionDate} 
                fileUrl={practical.url} 
                linkedinUrl={practical.contributedBy.linkedinUrl} 
              />
            ))}
          </>
        }
      </div>
      {!isLoading && pages > 0 && (
        <div className="flex justify-center items-center gap-5 mb-20">
          <button onClick={handelPrev} className="border-secondary border-2 text-secondary px-4 py-1 rounded-lg font-semibold">Prev</button>
          <p className="text-2xl font-semibold">{currPage}  of  {pages}</p>
          <button onClick={handelNext} className="border-secondary border-2 text-secondary px-4 py-1 rounded-lg font-semibold">Next</button>
        </div>
      )}
    </div>
  )
}

export default Practicals