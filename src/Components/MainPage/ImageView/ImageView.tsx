import { ImageFile } from "../../../Services/images";

const ImageView: React.FC<ImageFile> = (props) => {
    return <div className="cardDesign">
        <div className="card">
            <img className="card-img-top" src={props.path} alt="" />
            <div className="card-body">
                <h4 className="card-title">{props.creatorName}</h4>
            </div>
        </div>
    </div>
}

export default ImageView;