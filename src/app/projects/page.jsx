
import { asset } from "../lib/asset";

const projects = () => {

    return(
        <div className="projects">
            <h1>Projects</h1>
            <div className="images">
                <div className="img-wrap">
                    <img src={asset("/img/Anime_pic.webp")} alt="Work_001"/>
                </div>
                <div className="img-wrap">
                    <img src={asset("/img/AS_029_ai.webp")} alt="work_002"/>
                </div>
                <div className="img-wrap">
                    <img src={asset("/img/AS_028_ai.webp")} alt="Work_003"/>
                </div>
                <div className="img-wrap">
                <img src={asset("/img/no_face_art.webp")} alt="Work_004"/>
                </div>
                <div className="img-wrap">
                    <img src={asset("/img/AS_007_ai.webp")} alt="Work_005"/>
                </div>
                <div className="img-wrap">
                    <img src={asset("/img/AS_013_ai.webp")} alt="work_006"/>
                </div>
                <div className="img-wrap">
                    <img src={asset("/img/AS_021_ai.webp")} alt="Work_007"/>
                </div>
                <div className="img-wrap">
                <img src={asset("/img/AS_027_ai.webp")} alt="Work_008"/>
                </div>
            </div>
        </div>
    );
};

export default projects