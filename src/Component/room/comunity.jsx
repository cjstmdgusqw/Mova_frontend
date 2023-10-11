import axios from "axios";
import './community.css'
import { useEffect, useState } from "react";
import DetailCommunity from "./detailCommunity";

const Comunity = (Props) => {
    const [show, SetShow] = useState(false);
    const movePage = () => {
        window.location.replace(`http://localhost:3000/room/writecommunity/${Props.roomid}`)
    }

    const [community, setCommunity] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/community/selectfeed', {
            params: {
                roomid: Props.roomid
            }
        })
            .then(res => {
                console.log(res.data);
                setCommunity(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const showModal = () => {
        SetShow(true);
    }

   const noshow = () => {
    SetShow(false);
   }


    return (
        <div id="community">
            <div className="community_main">
                <div className="box"></div>
                <div className="box2">
                    <input type="button" value="글쓰기" className="community_button" onClick={movePage}></input>
                </div>
                {
                    community.map(com => {
                        return (
                            <div className="community_total" key={com.community_id}>
                                <div className="community_sub" id="commjnity_sub">
                                    <div className="community_profile">
                                        <div className="profile_main">
                                            <img className="profile_image" src={`http://localhost:8080/member/view/${com.member.filename}`} alt=""></img>
                                            <span className="profile_name">{com.member.nickname}</span>
                                        </div>
                                    </div>
                                    <div className="community_content" onClick={showModal}>{com.content}</div>
                                    <div className="community_count">

                                    </div>
                                </div>
                                <div className="community_picture">
                                    <img className="community_image" alt="" src={`http://localhost:8080/member/view/${com.filename.split(",")[0]}`} onClick={showModal}></img>
                                </div>
                            </div>
                        )
                    })
                }
                    <DetailCommunity show={show} noshow={noshow}/>

            </div>
        </div>
    )
}
export default Comunity;