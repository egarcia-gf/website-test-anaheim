import Image from "next/image"
import { asset } from "../lib/asset";

const info = () => {
    return(
        <div className="info">
            <div className="col">
                <img src={asset("/img/rpbk_hz.webp")} alt="profile pic" />
            </div>
            <div className="col">
                <p>
                    So this is Anaheim Studio. Honestly it's design, but I don't stick to one thing: logos, artist artwork, websites, 3D animation. If your project needs a brand and that brand also needs to move on screen, I handle both, because for me it's less about hitting a checklist and more about making sure people actually notice it. If someone looks at your logo or your site and thinks "I've seen this before," I screwed up. So no templates, no shortcuts, just enough obsessing over the details that you can feel there was an actual decision behind every piece.
                </p>
            </div>
        </div>
    )
}

export default info