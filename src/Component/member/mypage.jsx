import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Sub1 from "./mypage/sub1";
import Sub2 from "./mypage/sub2";

const Mypage = () => {

    const memberid = useParams().id;
    const [filename, SetFilename] = useState("");
    const [memberId, SetmemberId] = useState();
    const [member, Setmember] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/member/mypage`, {
            params: {
                id: memberid
            }
        })
            .then(res => {
                SetFilename(res.data.filename);
                Setmember(prevMember => ({ ...prevMember, ...res.data }));
                SetmemberId(res.data.memberId);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [memberid])
    
    return (
        <div id="mypage">
            <div className="mypage">
                <div className="mypageMain">
                    <div className="profile_block">
                        <img className="profile" src={`http://localhost:8080/member/view/${filename}`} alt=""></img>
                        <div className="name">{member.name}</div>
                        <div className="nickname">닉네임 : {member.nickname}</div>
                    </div>
                </div>
                <div>
                    <div className="mypageSubpage1">
                        <Sub1 id={memberId}/>
                    </div>
                    <div className="subsubpage">
                        <div className="mypageSubpage2">
                            <Sub2 id={memberId}/>
                        </div>
                        <div className="mypageSubpage3">

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Mypage;