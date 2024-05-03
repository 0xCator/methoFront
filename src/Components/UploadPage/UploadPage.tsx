import React, { useRef, useState } from 'react'
import Header from '../Header/header'
import styles from './UploadPage.module.css';
import axios from 'axios';
import { backendPath } from '../../Services/constants';
import { getUserData } from '../../Services/userData';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
    const fileInput = useRef<HTMLInputElement>(null);
    const userData = getUserData();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (fileInput.current?.files) {
            const file = fileInput.current.files[0];

            const formData = new FormData();
            if (file) {
                setLoading(true);
                formData.append('file', file);
                axios
                .post(backendPath + "/api/Image/upload/" + userData?.user?.sub, formData, {
                    headers: {
                        Authorization: `Bearer ${userData?.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    navigate("/");
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        }
    }

    const loadingSpinner = () => {
        return (
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        );
      };

    return (
        <>  
        <Header/>
        <div className={`container ${styles.container}`}>
            {loading ? loadingSpinner() : 
            <>
            <h1>You can upload your image here!</h1>
            <br/>
            <input placeholder ="Choose Image" type="file" ref={fileInput} className="btn btn-default"/>

            <button type="button" onClick={handleUpload} className="btn btn-primary">Upload</button>
            </>
            }
        </div>
        </>
    )
}

export default UploadPage