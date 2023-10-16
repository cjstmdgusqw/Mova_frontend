import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './memberlist.css';
import Profilemodal from "./profilemodal";

const Memberlist = () => {
    const params = useParams();
    const [teamMember, SetTeamMember] = useState([]);
    const [ApplyteamMember, SetApplyTeamMember] = useState([]);
    const [show, setShow] = useState(false);
    const [showmodal, setShowModal] = useState(false);
    const [id, setId] = useState();

    console.log(teamMember);

    useEffect(()=>{
        axios.get("http://localhost:8080/member/selectMember", {
            params : {
                state : 1,
                roomid : params.id
            }
        })
        .then(res=>{
            console.log(res.data);
            SetTeamMember(res.data);
        })    
        .catch(err=>{
            // console.log(err);
        })
    },[params.id]);
    
    useEffect(()=>{
        axios.get("http://localhost:8080/member/selectApplyMember", {
            params : {
                state : 0,
                roomid : params.id
            }
        })
        .then(res=>{
            console.log(res.data);
            SetApplyTeamMember(res.data);
        })    
        .catch(err=>{
            // console.log(err);
        })
    },[params.id]);
  

    const handleCorrectButton = (e) => {
        const memberid = e;
        axios.post("http://localhost:8080/member/correct",null,{

            params : {
                teamMemberId : memberid
            }
        })
        .then(res=>{
            console.log(res.data);
            setShow(true);
        })
        .catch(err=>{
            // console.log(err);
        })
    }

    const handleFailButton = (e) => {
        const memberid = e;
        axios.post("http://localhost:8080/member/fail",null,{
            params : {
                teamMemberId : memberid
            }
        })
        .then(res=>{
            console.log(res.data);
            setShow(true);
        })
        .catch(err=>{
            // console.log(err);
        })
    }

    const openProfile = (e) => {
        setShowModal(true);
        setId(e.target.getAttribute("value"));  
   };

    const noprofileShow = () => {
        setShowModal(false);
    }



    return (
        <div id="memberlist">
            <div className="memberlist">멤버 리스트</div>
            <div className=''>
                <table>
                    <thead>
                        <tr>
                            <th width="30">닉네임</th>
                            <th width="30">이름</th>
                            <th width="30">강퇴하기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teamMember.map(list => {
                                return (
                                    <tr key={list.team_member_id}>
                                        <td width="50" >{list.member.nickname}</td>
                                        <td width="50">{list.member.name}</td>
                                        <td width="20">
                                            <div>
                                                <input className="failButton" type="button" value="강퇴" onClick={()=> handleFailButton(list.team_member_id)}></input>
                                            </div>
                                        </td>
                                    </tr>       
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="memberlistapply">신청 리스트<span className="subname">     * 닉네임을 클릭하면 신청자의 정보를 알 수 있습니다</span></div>
            <div className=''>
                <table>
                    <thead>
                        <tr>
                            <th width="30">닉네임</th>
                            <th width="30">이름</th>
                            <th width="30">수락/거절</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ApplyteamMember.map(list => {
                                return (
                                    <>
                                    
                                    <tr key={list.team_member_id} className={`${show ? 'noshow' : ''}`}>
                                        <td className="nickname" width="50" onClick={openProfile} value={list.member.memberId}>{list.member.nickname}</td>
                                        <td width="50">{list.member.name}</td>
                                        <td width="20">
                                            <div>
                                                <input className="correctButton" type="button" value="수락" onClick={()=> handleCorrectButton(list.team_member_id)}></input>
                                                <input className="failButton" type="button" value="거절" onClick={()=> handleFailButton(list.team_member_id)}></input>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    </>
                                           
                                )
                            })
                        }
                        <Profilemodal show={showmodal} noshow={noprofileShow} memberid2={id}/>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Memberlist;

// onClick={()=> sendData(list.team_member_id)}