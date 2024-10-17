import React, { useState } from 'react'
import MyDropzone from '../components/MyDropzone'
import QuoteCard from '../components/QuoteCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Upload = () => {

  const navigate = useNavigate();
  const [typeName, setTypeName] = useState("Paper");
  const [paperType, setPaperType] = useState("MSE 1")
  const [uploadedURL, setUploadedURL] = useState(null)
  const [newFileName, setNewFileName] = useState(null)

  const sendDataToParent = (data) => {
    setUploadedURL(data.uploadedURL)
    setNewFileName(data.newFileName)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileName = newFileName
    const fileURL = uploadedURL
    const courseName = event.target.courseName.value
    const department = event.target.department.value
    const type = typeName

    if (type === "Paper") {
      toast.promise(
        axios.post(`https://ycce-help-backend.onrender.com/upload/paper`, {
          fileName,
          fileURL,
          courseName,
          department,
          paperType
        }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        ),
        {
          pending: 'Uploading...',
          success: 'Uploaded Successfully!',
          error: {
            render({ data }) {
              if (data.response && data.response.data.message === "Session expired! Please login again.") {
                navigate('/signin');
                return data.response.data.message;
              }
              return data.response?.data?.message || 'Upload failed';
            }
          }
        }
      ).then(() => {
        navigate('/profile');
      });

    } else {
      console.log(fileName, fileURL, courseName, department, type, event.target.practical.value)
      const practicalNo = event.target.practical.value
      toast.promise(
        axios.post(`https://ycce-help-backend.onrender.com/upload/practical`, {
          fileName,
          fileURL,
          courseName,
          department,
          practicalNo
        }, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        ),
        {
          pending: 'Uploading...',
          success: 'Uploaded Successfully!',
          error: {
            render({ data }) {
              if (data.response && data.response.data.message === "Session expired! Please login again.") {
                navigate('/signin');
                return data.response.data.message;
              }
              return data.response?.data?.message || 'Upload failed';
            }
          }
        }
      ).then(() => {
        navigate('/profile');
      });
    }
  }

  const handleDropdown = (event) => {
    setTypeName(event.target.value);
  }

  const handlePaperDropdown = (event) => {
    setPaperType(event.target.value);
  }

  return (
    <div className='flex flex-col min-h-screen px-4 lg:px-36 w-full mt-8'>
      <div className='flex justify-between'>
        <h3 className="text-2xl text-secondary">Upload file</h3>
      </div>
      <div className="flex flex-col justify-between items-center gap-8 py-8 mx-0 lg:mx-6 mt-10 mb-20 bg-block rounded-xl">
        <MyDropzone folder="Files" sendDataToParent={sendDataToParent} />
        <form className="w-10/12 h-72 flex flex-col justify-center items-center gap-5" onSubmit={handleSubmit}>
          <div className="coursename flex lg:gap-5 items-center w-full">
            <label htmlFor="courseName" className="px-3 w-40 text-primary lg:font-semibold">Course Name :</label>
            <input name="courseName" type="text" className="rounded-lg px-3 py-3 text-white bg-[#5F5F60] w-full" />
          </div>
          <div className="department flex lg:gap-5 items-center w-full">
            <label htmlFor="department" className="px-3 w-40 text-primary lg:font-semibold">Department Name :</label>
            <input name="department" type="text" className="rounded-lg px-3 py-3 text-white bg-[#5F5F60] w-full" />
          </div>
          <div className="typeselection justify-center items-center">
            <select id="browsers" className=" w-60 rounded-lg px-3 py-3 text-white bg-[#5F5F60]" onChange={handleDropdown}>
              <option value="Paper">Paper</option>
              <option value="Practical">Practical</option>
            </select>
          </div>
          <div className="type flex gap-5 items-center w-full">
            {typeName === "Paper" ? (
              <div className="paperType flex lg:gap-5 items-center w-full">
                <label className="px-3 w-40 text-primary lg:font-semibold">Paper Type</label>
                <select id="paperType" className=" w-60 rounded-lg px-3 py-3 text-white bg-[#5F5F60]" onChange={handlePaperDropdown}>
                  <option value="MSE 1">MSE 1</option>
                  <option value="MSE 2">MSE 2</option>
                  <option value="Re MSE">Re MSE</option>
                  <option value="ESE">ESE</option>
                </select>
              </div>
            ) : (
              <div className="practical flex gap-5 items-center w-full">
                <label htmlFor="practical" className="px-3 w-40 text-primary font-semibold">Practical No. :</label>
                <input name="practical" type="text" className="h-10 rounded-lg px-3 py-3 text-black bg-[#5F5F60] w-full" />
              </div>
            )}
          </div>
          <button type="submit" className={`w-60 border-2 text-primary border-primary px-10 py-3 rounded-2xl`}>
            Upload files
          </button>
        </form>
      </div>
      <QuoteCard />
    </div>
  )
}

export default Upload