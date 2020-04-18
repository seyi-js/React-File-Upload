import React, {Fragment, useState} from 'react'
import Axios from 'axios'
import Message from './Message'
import UploadPercentage from './UploadPercentage'
const FileUpload = () => {
    const [ file, setFile ] = useState( '' );
    const [ filename, setFilename ] = useState( 'Choose file' );
    const [ uploadedFile, setUploadedFile ] = useState( {} );
    const [ message, setMessage ] = useState( '' );
    const [uploadPercentage, setUploadPercentage] =useState(0)

    const onChange = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }
    const onSubmit =  e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append( 'file', file );
        uploadFile(formData)

    }

    const uploadFile = (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: ProgressEvent => {
                setUploadPercentage( parseInt( Math.round( ( ProgressEvent.loaded * 100 ) / ProgressEvent.total ) ) )
                setTimeout(() => setUploadPercentage(0), 10000);
            }
    
        }

        Axios
            .post( '/upload', formData, config )
            .then( res => {
                const { fileName, filePath } = res.data;
                
                setUploadedFile( { fileName, filePath } );
                setMessage('File Uploaded');
            } )
            .catch( err => {
                // console.log( err.response.data.msg )
                setMessage(err.response.data.msg)
        })
    }
    return (
        <Fragment>
            {message ? <Message msg={message}/> : null}
            <form onSubmit={onSubmit} >
            <div className="custom-file mb-4">
            <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                    <label className="custom-file-label" htmlFor="customFile">{filename }</label>
                </div>



                <UploadPercentage percent={uploadPercentage} />
                <input type="submit"  value="Upload" className="btn btn-primary btn-block mt-4" />
            </form>
            { uploadedFile ? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center ">{ uploadedFile.fileName }</h3>
                    <img style={ {width: '100%'} } src={uploadedFile.filePath}  alt=""/>
                </div>
            </div> : null}
        </Fragment>
    )
}

export default FileUpload