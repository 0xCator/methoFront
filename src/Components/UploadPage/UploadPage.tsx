import React, { useRef, useState } from 'react'
import Header from '../Header/header'
import styles from './UploadPage.module.css';

function UploadPage() {
    const fileInput = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>('');

    const handleUpload = async () => {
        if (fileInput.current?.files) {
            const file = fileInput.current.files[0];
            const reader = new FileReader();
            reader.onloadend = async () => {
                const image = reader.result as string;

                const response = await fetch('/api/uploadImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, image })
                });

                if (response.ok) {
                    console.log('Image posted successfully');
                } else {
                    console.error('Error posting image');
                }
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>  
        <Header/>
        <div className={`container ${styles.container}`}>
            <h1>You can upload your image here!</h1>
            <br />
            <input type='text' placeholder="Write the title to your image here" value={title} onChange={e => setTitle(e.target.value)} className={`form-control ${styles.formcontrol}`} />
            <br/>
            <input placeholder ="Choose Image" type="file" ref={fileInput} className="btn btn-default"/>

            <button type="button" onClick={handleUpload} className="btn btn-primary">Upload</button>
        </div>
        </>
    )
}

export default UploadPage