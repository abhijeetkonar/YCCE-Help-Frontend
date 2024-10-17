import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import FileSection from '../components/FileSection'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { ref, deleteObject } from "firebase/storage"
import { storage } from "../config/firebase.config"

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [totalContribution, setTotalContribution] = useState(0);
  const [editable, setEditable] = useState(false);
  const [type, setType] = useState('papers');
  const [papers, setPapers] = useState([]);
  const [practicals, setPracticals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nbHits, setNbHits] = useState(0);
  const [totalDoc, setTotalDoc] = useState(0);
  const [deleteContribution, setDeleteContribution] = useState(false);
  const [pages, setPages] = useState(0);

  useEffect(() => {

    const fetchData = async () => {
      await axios.get(`https://ycce-help-backend.onrender.com/user/profile`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        setName(res.data.user.username);
        setEmail(res.data.user.email);
        setLinkedin(res.data.user.linkedinUrl);
        setTotalContribution(res.data.user.totalContributions);
      }).catch((err) => {
        console.log(err);
      })

      await axios.get(`https://ycce-help-backend.onrender.com/user/${type}/contributions?page=${page}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        setIsLoading(false);
        if (type === 'papers') {
          setPapers(res.data.papers.papersContributed);
        } else {
          setPracticals(res.data.practicals.practicalsContributed);
        }
        setPages(Math.ceil(res.data.totalDoc / 8));
        setNbHits(res.data.nbHits);
        setTotalDoc(res.data.totalDoc);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
      })
    }

    fetchData();
  }, [type, deleteContribution, page]);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!editable) {
      axios.put(`https://ycce-help-backend.onrender.com/user/profile`, {
        username: name,
        email: email,
        linkedinUrl: linkedin
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        toast.success('Profile updated successfully!');
      }).catch((err) => {
        toast.error('Failed to update profile. Please try again. 😢');
      })
    }
  }

  const handleLogout = async () => {
    await axios.post(`https://ycce-help-backend.onrender.com/user/signout`, {}, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      localStorage.clear();
      toast.success('Logout Successfully!');
      navigate('/signin');
    }).catch((err) => {
      console.log(err);
    })
  }

  const handlePaperDropdown = (event) => {
    setType(event.target.value);
    setIsLoading(true);
  }

  const handleDelete = (fileName, id) => {
    const fileRef = ref(storage, `Files/${fileName}`);

    // Show toast for the delete process using toast.promise
    toast.promise(
      // Return the promise chain
      deleteObject(fileRef)
        .then(() => {

          // API call to delete the contribution
          return axios.delete(`https://ycce-help-backend.onrender.com//user/contributions/${type}/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        })
        .then((res) => {
          // Update state based on the type
          if (type === 'papers') {
            setPapers(res.data.papers);
          } else {
            setPracticals(res.data.practicals);
          }

          // Toggle deleteContribution state to trigger UI re-render
          setDeleteContribution(!deleteContribution);
        }),

      // Toast messages: Pending, Success, and Error
      {
        pending: 'Deleting contribution...',
        success: 'Contribution deleted successfully!',
        error: 'Failed to delete the contribution. Please try again. 😢'
      }
    ).catch((err) => {
      console.log(err);
    });
  };

  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handelPrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setIsLoading(true);
    }
  }

  const handelNext = () => {
    if (page < pages) {
      setPage(page + 1);
      setIsLoading(true);
    }
  }

  return (
    <div className='flex flex-col min-h-screen px-4 lg:px-36 w-full mt-8'>
      <div className='flex lg:flex-row flex-col gap-5 justify-between'>
        <h3 className="text-2xl text-secondary">Profile</h3>
        <button onClick={handleLogout} className={`w-34 border-2 text-secondary border-secondary px-10 py-2 rounded-2xl`}>Logout</button>
      </div>
      <form className="h-64 flex flex-col justify-center items-center gap-7 lg:mx-48 mt-32" onSubmit={handleSubmit}>
        <div className="name flex gap-5 items-center w-full">
          <label htmlFor="name" className="px-3 w-40 text-primary font-semibold lg:text-xl">Name :</label>
          <input name="name" type="text" disabled={!editable} value={name || ''} onChange={(e) => setName(e.target.value)} className={`${!editable && 'text-center'}  text-xl h-12 rounded-lg px-3 py-3 text-white bg-[#2A2A2A] w-full`} />
        </div>
        <div className="department flex gap-5 items-center w-full">
          <label htmlFor="department" className="px-3 w-40 text-primary font-semibold lg:text-xl">Email :</label>
          <input name="department" type="text" disabled={!editable} value={email || ''} onChange={(e) => setEmail(e.target.value)} className={`${!editable && 'text-center'}  text-xl h-12 rounded-lg px-3 py-3 text-white bg-[#2A2A2A] w-full`} />
        </div>
        <div className="linkedin flex gap-5 items-center w-full">
          <label htmlFor="linkedin" className="px-3 w-40 text-primary font-semibold lg:text-xl">LinkedIn :</label>
          <input name="linkedin" type="text" disabled={!editable} value={linkedin || ''} onChange={(e) => setLinkedin(e.target.value)} className={`${!editable && 'text-center'}  text-xl h-12 rounded-lg px-3 py-3 text-white bg-[#2A2A2A] w-full`} />
        </div>
        <div className="totalContribution flex gap-5 items-center w-full">
          <label htmlFor="totalContribution" className="px-3 w-80 text-primary font-semibold lg:text-xl">Total Contribution :</label>
          <input name="totalContribution" type="text" disabled={!editable} value={totalContribution} className="h-12 rounded-lg px-3 py-3 text-white bg-[#2A2A2A] w-24 text-center font-bold text-xl" />
        </div>
        <button className={`w-34 border-2 text-secondary border-secondary px-8 py-2 rounded-2xl`} onClick={() => setEditable(!editable)} >
          {editable ? 'Submit' : 'Edit'}
        </button>
      </form>
      <div className='flex flex-row justify-between items-center mt-32'>
        <h3 className="text-2xl text-secondary">Your Contribution</h3>
        <select id="type" className=" w-60 rounded-lg px-3 py-3 text-white bg-[#5F5F60]" onChange={handlePaperDropdown}>
          <option value="papers">Papers</option>
          <option value="practicals">Practicals</option>
        </select>
      </div>
      <div className="flex flex-col justify-between gap-8 lg:px-20 mt-10 mb-20">
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
            {type === 'papers' ? papers.map((paper) => (
              <FileSection
                key={paper._id}
                value="Paper Type : "
                icon="delete"
                courseName={capitalizeFirstLetter(paper.courseName)}
                paperType={capitalizeFirstLetter(paper.paperType)}
                department={capitalizeFirstLetter(paper.department)}
                contributedBy={name}
                contributionDate={paper.contributionDate}
                fileUrl={paper.url}
                linkedinUrl={paper.contributedBy.linkedinUrl}
                fileName={paper.fileName}
                handleDelete={handleDelete}
                id={paper._id}
              />
            )) : practicals.map((practical) => (
              <FileSection
                key={practical._id}
                value={`Practical No. : `}
                icon="delete"
                courseName={capitalizeFirstLetter(practical.courseName)}
                paperType={capitalizeFirstLetter(practical.practicalNo)}
                department={capitalizeFirstLetter(practical.department)}
                contributedBy={name}
                contributionDate={practical.contributionDate}
                fileUrl={practical.url}
                linkedinUrl={practical.contributedBy.linkedinUrl}
                fileName={practical.fileName}
                handleDelete={handleDelete}
                id={practical._id}
              />
            ))}
          </>
        }
      </div>
      {!isLoading && pages > 0 && (
        <div className="flex justify-center items-center gap-5 mb-20">
          <button onClick={handelPrev} className="border-secondary border-2 text-secondary px-4 py-1 rounded-lg font-semibold">Prev</button>
          <p className="text-2xl font-semibold">{page}  of  {pages}</p>
          <button onClick={handelNext} className="border-secondary border-2  text-secondary px-4 py-1 rounded-lg font-semibold">Next</button>
        </div>
      )}
    </div>
  )
}

export default Profile
