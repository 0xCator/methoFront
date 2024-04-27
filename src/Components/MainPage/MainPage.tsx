import Header from '../Header/header';
import { imageData } from '../../Services/images';
import ImageView from './ImageView/ImageView';

function MainPage() {
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
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {imageData.map((image) => {
                    return (
                        <ImageView path={image.path} creatorName={image.creatorName} />
                    );
                })}
            </div>
        </>
    );
}

export default MainPage;