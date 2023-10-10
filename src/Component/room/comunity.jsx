import axios from "axios";
import './community.css'

const Comunity = (Props) => {
    const movePage = () => {
        window.location.replace(`http://localhost:3000/room/writecommunity/${Props.roomid}`)
    }

    return(
        <div id="community">
            <div className="community_main">
                <div className="box"></div>
                <div className="box2">
                    <input type="button" value="글쓰기" className="community_button" onClick={movePage}></input>
                </div>
                <div className="community_total">
                    <div className="community_sub" id="commjnity_sub">
                        <div className="community_profile"></div>
                        <div className="community_content"></div>
                        <div className="community_count"></div>
                    </div>
                    <div className="community_picture"></div>
                </div>
            </div>
        </div>
    )
}

export default Comunity;