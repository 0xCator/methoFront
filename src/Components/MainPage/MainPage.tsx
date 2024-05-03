import Header from '../Header/header';
import { ImageFile } from '../../Services/images';
import ImageView from './ImageView/ImageView';
import { useEffect, useState } from 'react';
import { getUserData } from '../../Services/userData';
import axios from 'axios';
import { backendPath } from '../../Services/constants';

function MainPage() {
    const [gallery, setGallery] = useState({
        loading: true,
        result: [] as ImageFile[],
        err: null,
      });
    const userData = getUserData();

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

    useEffect(() => {
        if (userData !== null) {
            axios
                .get(backendPath + '/api/Image', {
                    headers: {
                        Authorization: 'Bearer ' + userData.token,
                    },
                })
                .then((response) => {
                    const tempGallery: ImageFile[] = [];
                    response.data.forEach((imageFile: ImageFile) => {
                        imageFile.filePath = backendPath + "/" + imageFile.filePath;
                        tempGallery.push(imageFile);
                    });
                    setGallery({...gallery, loading: false, result: tempGallery});
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    })
    return (
        <>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Welcome to Image Processing</h1>
                        <p>Here you could find some images generated out of users' uploads!</p>
                    </div>
                </div>
            </div>
            <br></br>

            {userData === null ? 
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Sign in to view images</h1>
                        </div>
                        </div>
                        </div>:
            (gallery.loading ? loadingSpinner() : 
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {gallery.result.map((image) => {
                    return (
                        <ImageView filePath={image.filePath} fileName={image.fileName} userName={image.userName} />
                    );
                })}
            </div>
            )
        }
        </>
    );
}

export default MainPage;