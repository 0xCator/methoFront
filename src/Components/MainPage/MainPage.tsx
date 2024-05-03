import Header from '../Header/header';
import { ImageFile } from '../../Services/images';
import ImageView from './ImageView/ImageView';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendPath } from '../../Services/constants';

function MainPage() {
    const [gallery, setGallery] = useState({
        loading: true,
        result: [] as ImageFile[],
        err: null,
      });

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
            axios
                .get(backendPath + '/api/Image', {
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

    })
    return (
        <>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Welcome to Image Processing</h1>
                        <p>In a world of ones and zeros, even abstract art can be computed!</p>
                    </div>
                </div>
            </div>
            <br></br>
           {(gallery.loading ? loadingSpinner() : 
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
