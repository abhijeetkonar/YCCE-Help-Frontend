import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import TopContributor from '../components/TopContributor'
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'

const Home = () => {
  const [users, setUsers] = useState(0)
  const [papers, setPapers] = useState(0)
  const [practicals, setPracticals] = useState(0)
  const [topContributors, setTopContributors] = useState([])
  const [topContributorsLoading, setTopContributorsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`https://ycce-help-backend.onrender.com/count`)
        .then((res) => {
          setUsers(res.data.users)
          setPapers(res.data.papers)
          setPracticals(res.data.practicals)
        })
        .catch((err) => {
          console.log(err)
        })

      await axios.get(`https://ycce-help-backend.onrender.com/top-contributors`)
        .then((res) => {
          setTopContributors(res.data.users)
          setTopContributorsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchData()
  }, [])

  return (
    <>
      <div className='lg:h-screen px-4 lg:px-36 w-full'>
        <div id="header" className='flex flex-col gap-11 text-center justify-center items-center pt-24'>
          <h1 className="text-5xl lg:text-6xl font-bold">Made <span className='text-secondary'>for</span> you, Made <span className='text-primary'>by</span> you</h1>
          <p className='text-[#BBBBBB] text-justify lg:text-xl lg:text-center'>
            This is an place where you can upload and download the study materials like practicals and question papers and lot more study materials which will benifit other students . Anyone can upload the material as well as download the documents they need.
          </p>
          <div className='flex flex-col lg:flex-row gap-5 lg:gap-20'>
            <Button text="Upload files" color="primary" link="upload" />
            <Button text="Download files" color="secondary" link="papers" />
          </div>
        </div>
        <div id="counts" className='w-full flex gap-10 justify-center items-center mt-24 lg:mt-36'>
          <div className='flex flex-col justify-center items-center'>
            <h2 className="text-3xl lg:text-5xl after:content-['+'] text-[#B4B4B4]">{users}</h2>
            <h5 className='text-lg lg:text-xl text-[#B4B4B4] font-thin'>Users</h5>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h2 className="text-3xl lg:text-5xl after:content-['+'] text-[#B4B4B4]">{papers}</h2>
            <h5 className='text-lg lg:text-xl text-[#B4B4B4] font-thin'>Papers</h5>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h2 className="text-3xl lg:text-5xl after:content-['+'] text-[#B4B4B4]">{practicals}</h2>
            <h5 className='text-lg lg:text-xl text-[#B4B4B4] font-thin'>Practicals</h5>
          </div>
        </div>
      </div>
      <div className="contributors px-4 lg:px-36 mb-36 mt-20 lg:mt-0">
        <h3 className="text-xl lg:text-2xl text-secondary">Top Contributors</h3>
        <div className="flex flex-col justify-center items-center gap-8 my-12 ">
          {topContributorsLoading ?
            <div className='flex justify-center items-center'>
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div> :
            <>
              {topContributors.map((contributor, index) => (
                <TopContributor
                  key={index}
                  rank={index + 1}
                  name={contributor.username}
                  count={contributor.totalContributions}
                />
              ))}
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Home