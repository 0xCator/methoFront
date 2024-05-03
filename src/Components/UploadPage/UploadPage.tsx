import React, { useRef, useState } from 'react';
import Header from '../Header/header';
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
    const [isHovered, setIsHovered] = useState(false);

    const handleUpload = async (files: FileList | undefined | null) => {
        if (files === undefined || files === null) {
            return;
        }
        const file = files[0];

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
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            handleUpload(event.target.files);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation(); // Stop propagation to prevent opening the file in a new tab
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleUpload(files);
        }
        setIsHovered(false); // Reset hover state
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation(); // Stop propagation to prevent opening the file in a new tab
    };

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
            <Header />
            <div className={`container ${styles.container}`}>
                {loading ? (
                    loadingSpinner()
                ) : (
                    <>
                        <h1>You can upload your image here!</h1>
                        <br />
                        <input
                            type="file"
                            ref={fileInput}
                            className="btn btn-default"
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                        />
                        <div
                            className={`drag-drop-area ${isHovered ? 'hover' : ''}`}
                            onClick={() => fileInput.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragEnter={() => setIsHovered(true)}
                            onDragLeave={() => setIsHovered(false)}
                            style={{
                                border: '2px dashed #ccc',
                                borderRadius: '5px',
                                textAlign: 'center',
                                padding: '20px',
                                marginBottom: '20px', 
                            }}
                        >
                            <p>Drag & Drop your image here, or click to select</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleUpload(fileInput.current?.files)}
                            className="btn btn-primary"
                        >
                            Upload
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

export default UploadPage;

