import { ImageFile } from "../../../Services/images";
import styles from './ImageView.module.css';

const ImageView: React.FC<ImageFile> = (props) => {
    return <div className="cardDesign">
        <div className="card">
            <img className={`card-img-top ${styles.imageSize}`}  src={props.filePath} alt="" />
            <div className="card-body">
                <h4 className={`card-title ${styles.titleSize}`}>{props.fileName}</h4>
                <h5 className={`card-title ${styles.textSize}`}>{"by "+ props.userName}</h5>
            </div>
        </div>
    </div>
}

export default ImageView;