import { useEffect, useState } from 'react';
import './selectnotice.css'
import axios from "axios";
import { useParams } from 'react-router-dom';

const SelectNotice = () => {

    const roomId = useParams();
    const [notice, setNotice] = useState([]);
    const memberId = localStorage.getItem("id");
    const [memberid, setMemberid] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/room/selectroom/${roomId.id}`)
            .then(res => {
                console.log(res.data);
                setNotice(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`http://localhost:8080/member/selectmemberID/`,{
            params:{
                id : memberId
            }
        })
        .then(res=>{
            console.log(res.data);
            setMemberid(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [roomId.id, memberId]);

    const HandleSubmit = () => {
        axios.post("http://localhost:8080/member/apply", {
                id : memberid,
                roomid : parseInt(roomId.id)
        })
        .then(res=>{ 
            if(localStorage.getItem("id") === null){
                alert("로그인이 필요한 서비스입니다");
                window.location.replace("/login");
            }else{
                alert(res.data);
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div id='selectroom'>
            <div className='main'>
                <div className='a'></div>
                <div className='title'>
                    {notice.roomTitle}
                </div>
                <div className='content'>
                    <section>
                        <ul>
                            <li>
                                <span className='span1'>모집 인원</span>
                                <span className='span2'>{notice.roomPersonnel}</span>
                            </li>
                            <li>
                                <span className='span1'>진행 방식</span>
                                <span className='span2'>{notice.roomOnline}</span>
                            </li>
                            <li>
                                <span className='span1'>진행 기간</span>
                                <span className='span2'>{notice.roomPeriod}</span>
                            </li>
                            <li>
                                <span className='span1'>모집 마감</span>
                                <span className='span2'>{notice.roomDeadline}</span>
                            </li>
                            {/* <li>
                                <span>모집인원</span>
                                <span>{notice.roomPersonnel}</span>
                            </li>
                            <li>
                                <span>모집인원</span>
                                <span>{notice.roomPersonnel}</span>
                            </li> */}
                        </ul>
                    </section>
                </div>
                <div className='box'>스터디 컨셉</div>
                <div className='studyroom'>
                   <pre className='roomcontent'> 
                        {notice.roomContent}
                   </pre>
                </div>

                <div className='Button'>
                    { 
                        notice && notice.member && localStorage.getItem("id") !== notice.member.id && 
                        <button onClick={HandleSubmit}>신청하기</button> 
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectNotice;