import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(Array.from(e.target.files));
        setFilename(e.target.files[0].name)
    }

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('Please select file');
        let fileExtension;
        if (typeof filename != "undefined") {
           fileExtension = filename.substring(filename.lastIndexOf(".")+1, filename.length).toLowerCase();
        }
        if (fileExtension === 'doc' || fileExtension === 'docx' || fileExtension === 'xls' || fileExtension === 'xlsx' || fileExtension === 'zip' || fileExtension === 'js' || fileExtension === 'mp3' || fileExtension === 'mp4') {
            setMessage('Unable to upload a file: This file type is not supported')
            return
        }
        let formData;
        for (let index = 0; index < file.length; index++) {
            const element = file[index];
            formData = new FormData();
            formData.append('file', element);
        try {
            const res = await axios.post('http://localhost:4000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                          Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                      );

                    // clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
                
            });

            const  { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath, fileExtension });
            setMessage('File has been successfully uploaded')

        } catch (error) {
            if (error.response && error.response.status === 500) {
                setMessage('There was a problem with the server')
            } else {
                setMessage(error.response.data.message);
            }
        }
        }
    }
    return (
        <Fragment>
            { message ? <Message  message={message} /> : null }
            <form onSubmit={onSubmit}>
                <div className="custom-file">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                        multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>

                {file && <Progress percentage={uploadPercentage}  />}
                
                <div className="text-center">
                    <input type="submit" value="Upload" className="btn btn-primary mt-4" />
                </div>
            </form>
            { uploadedFile && (uploadedFile.fileExtension === 'png' || uploadedFile.fileExtension === 'jpeg' || uploadedFile.fileExtension === 'gif' || uploadedFile.fileExtension === 'jpg')? 
                (<div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center">{ uploadedFile.fileName}</h3>
                        <img style={{ width: '100%'}} src={uploadedFile.filePath} alt=""/>
                    </div>
                </div>
                ): null}
            { uploadedFile && (uploadedFile.fileExtension === 'pdf' || uploadedFile.fileExtension === 'html')? 
                (<div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center">{ uploadedFile.fileName}</h3>
                        <embed src={uploadedFile.filePath} width="800px" height="800px" />
                    </div>
                </div>
                ): null}
        </Fragment>
    )
}

export default FileUpload
