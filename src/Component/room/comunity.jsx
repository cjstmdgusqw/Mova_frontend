import axios from "axios";
import './community.css'
import { useEffect, useState } from "react";
import DetailCommunity from "./detailCommunity";
import Profilemodal from "./profilemodal";
import { FcLike } from 'react-icons/fc';
const Comunity = (Props) => {
    const [show, SetShow] = useState(false);
    const [profileShow, SetProfileShow] = useState(false);
    const [community, setCommunity] = useState([]);
    const [communityId, SetCommunityId] = useState();
    const [memberid, setmemberId] = useState();
    

    const movePage = () => {
        window.location.replace(`http://localhost:3000/room/writecommunity/${Props.roomid}`);
    }

    const selectfeed = () => {
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
            // console.log(err); 
        })
}

    useEffect(() => {
        selectfeed();
    }, [Props.roomid]);

    const showModal = (e) => {
        SetShow(true);
        SetCommunityId(e.target.getAttribute("value"));
    };

   const noshow = (e) => {
        SetShow(false);
        selectfeed();
   };

   const openProfile = (e) => {
        SetProfileShow(true);
        setmemberId(e.target.getAttribute("value"));  
   };

   const noprofileShow = () => {
    SetProfileShow(false);
    selectfeed();
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
                                            <img className="profile_image" src={`http://localhost:8080/member/view/${com.member.filename}`} alt="" onClick={openProfile} value={com.member.memberId}></img>
                                            <span className="profile_name">{com.member.nickname}</span>
                                        </div>
                                    </div>
                                    <div className="community_content" onClick={showModal} value={com.community_id}>{com.title}</div>
                                    <div className="community_count">
                                        {
                                            com.like_count === 0  && (
                                                <>칭찬이 필요합니다!</>
                                            )
                                        }
                                        {
                                            com.like_count !==0 && (
                                                <>
                                                 칭찬 스티커<FcLike/>를 {com.like_count}개 받았습니다!  
                                                </>
                                            )
                                        }
                                       
                                    </div>
                                </div>
                                <div className="community_picture">
                                    <img className="community_image" alt="" src={`http://localhost:8080/member/view/${com.filename.split(",")[0]}`} onClick={showModal} value={com.community_id}></img>
                                </div>
                            </div>
                        )
                    })
                }
                    <DetailCommunity show={show} noshow={noshow} communityid={communityId}/>
                    <Profilemodal show={profileShow} noshow={noprofileShow} memberid2={memberid}/>

            </div>
        </div>
    )
}
export default Comunity;