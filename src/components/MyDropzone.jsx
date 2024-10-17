import React from 'react'
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "react-toastify"
import { v4 } from "uuid"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "../config/firebase.config"

export default function MyDropzone(props) {
    const [dataURL, setDataURL] = useState(null)
    const [uploadedURL, setUploadedURL] = useState(false);
    const [newFileName, setNewFileName] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader()
            reader.onabort = () => console.log("file reading was aborted")
            reader.onerror = () => console.log("file reading has failed")
            reader.onload = () => {
                const binaryStr = reader.result
                setDataURL(binaryStr)
            }
            reader.readAsDataURL(file)
        })
    }, [])

    const {
        getRootProps,
        acceptedFiles,
        getInputProps,
        isDragActive,
    } = useDropzone({ onDrop })

    const selectedFile = acceptedFiles[0]

    const uploadFile = async () => {

        if (selectedFile == null) {
            toast.error("Please select a file");
            return;
        }

        const originalFileName = selectedFile.name.split('.').slice(0, -1).join('.');
        const fileExtension = selectedFile.name.split('.').pop();
        const newFileName = `${originalFileName}_${Date.now()}_${v4()}.${fileExtension}`;
        setNewFileName(newFileName);

        const fileRef = ref(storage, `${props.folder}/${newFileName}`);

        const uploadPromise = uploadBytes(fileRef, selectedFile);
        await toast.promise(
            uploadPromise,
            {
                pending: 'Uploading file...',
                success: 'File uploaded successfully',
                error: 'File upload failed'
            }
        );
        const url = await getDownloadURL(fileRef);
        setUploadedURL(true);
        
        toast.info("Fill the details of the file");
        props.sendDataToParent({ uploadedURL: url, newFileName });

    }

    const deleteFile = () => {
        if (uploadedURL) {
            const deleteRef = ref(storage, `${props.folder}/${newFileName}`);
            
            toast.promise(
                deleteObject(deleteRef),
                {
                    pending: 'Deleting file...',
                    success: 'File deleted successfully',
                    error: 'File deletion failed'
                }
            );
        }
    }

    return (
        <div className="container">
            <div className="zone flex justify-center items-center">
                {dataURL ? (
                    <div className="selected drop-zone border-2 border-dashed border-primary rounded-xl w-2/3 h-64 flex flex-col justify-center items-center gap-3">
                        <div className='flex flex-col justify-center items-center'>
                            <img className="w-20" src="./file.png" />
                            <p className='text-primary'>File selected</p>
                        </div>
                        <div className="actions">
                            {uploadedURL ? (
                                <span className="text-secondary mr-4">Uploaded!</span>
                            ) : (
                                <button
                                    onClick={uploadFile}
                                    className="border-primary border rounded-xl px-2 py-1 text-sm mr-4"
                                >
                                    Upload
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setDataURL(null);
                                    setUploadedURL(false);
                                    deleteFile();
                                }}
                                className="border-[#ff0000] border rounded-xl px-2 py-1 text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="drop-zone border-2 border-dashed bg-primary/[.06] border-primary rounded-xl w-10/12 h-48 lg:h-60 flex justify-center" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <div className="drop-files flex flex-col justify-center items-center">
                                <img className="w-20" src="./uploadHereIcon.png" />
                                <p className='font-bold'>Upload Here </p>
                            </div>
                        ) : (
                            <div className="drag-files flex flex-col items-center justify-center gap-2">
                                <img className="w-28" src="./uploadIcon.png" />
                                <p className='font-bold'>Drag & drop file or <span className='text-primary cursor-pointer'>Browse</span> </p>
                                <div className='text-[#ACACAC] text-center'>supported formates : png, jpeg, pdf, word</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}