import { useEffect, useState } from 'react';
import './room.css';
import axios from "axios";

const Makeroom = () => {
    const [room, setRoom] = useState({roomPersonnel : "", roomOnline : "", roomPeriod : "", roomDeadline : "", roomtitle : "", roomContent : ""});
    const Id = localStorage.getItem("id");
    const handleChange = (e, fieldName) => {
        setRoom({...room, [fieldName]: e.target.value});
    }

    const [memberId, setMemberId] = useState(0);
    
    useEffect(()=>{
        axios.get("http://localhost:8080/member/selectmemberID",{
            params: {
                id: Id
            }
        })
        .then(res=>{
            setMemberId(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[Id]);

    const submit = () => {
        if (room.roomPersonnel.trim() === '') {
            alert('빈칸없이 입력 바랍니다');
        } else if (room.roomOnline.trim() === '') {
            alert('빈칸없이 입력 바랍니다');
        } else if (room.roomPeriod.trim() === '') {
            alert('빈칸없이 입력 바랍니다');
        } else if (room.roomDeadline.trim() === '') {
            alert('빈칸없이 입력 바랍니다');
        } else if (room.roomtitle.trim() === '') {
            alert('빈칸없이 입력 바랍니다');
        } else if (room.roomContent.trim() === '') {
            alert('빈칸없이 입력 바랍니다');
        } else {
            const formData = new FormData();
            formData.append('roomPersonnel', room.roomPersonnel);
            formData.append('roomOnline', room.roomOnline);
            formData.append('roomPeriod', room.roomPeriod);
            formData.append('roomDeadline', room.roomDeadline);
            formData.append('roomContent', room.roomContent);
            formData.append('roomTitle', room.roomtitle);
            formData.append('memberId', memberId);
            axios.post("http://localhost:8080/room/makeroom", formData)
            .then(res => {
                console.log(res);
                window.location.replace("/");
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
        
    return (
        <>
            <div id="makeroom">
                <div className="makeroomBox">
                    <h3 className="title">방 개설</h3>
                    <div className='roomgrid'>
                        <div>
                            <div align="left" className="smallTitle">모집 인원</div>
                            <select type="text"
                            placeholder='인원 미정 ~ 5명이상'
                            value={room.roomPersonnel}
                            onChange={(e) => handleChange(e, 'roomPersonnel')}
                            >
                                <option value="">--</option>
                                <option value="인원미정">인원미정</option>
                                <option value="1명">1명</option>
                                <option value="2명">2명</option>
                                <option value="3명">3명</option>
                                <option value="4명">4명</option>
                                <option value="5명">5명</option>
                            </select>
                        </div>
                        <div>
                            <div align="left" className="smallTitle">진행 방식</div>
                            <select type="text"
                            value={room.roomOnline}
                            onChange={(e) => handleChange(e, 'roomOnline')}
                            >
                                <option value="">--</option>
                                <option value="온라인">온라인</option>
                                <option value="오프라인">오프라인</option>
                            </select>
                        </div>
                        <div>
                            <div align="left" className="smallTitle">진행 기간</div>
                            <select type="text"
                            value={room.roomPeriod}
                            onChange={(e) => handleChange(e, 'roomPeriod')}
                            >
                                <option value="">--</option>
                                <option value="1개월">1개월</option>
                                <option value="2개월">2개월</option>
                                <option value="3개월" >3개월</option>
                                <option value="장기" >장기</option>
                            </select>
                        </div>
                        <div>
                            <div align="left" className="smallTitle">모집 마감</div>
                            <input type="date"
                                value={room.roomDeadline}
                                onChange={(e) => setRoom({ ...room, roomDeadline: e.target.value })}
                            />
                        </div>

                    </div>
                    <div>
                        <div align="left" className="smallTitle2">제목</div>
                        <input className="contentTitle" type="text" 
                            value={room.roomtitle}
                            placeholder='스터디에 대한 제목을 적어주세요'
                            onChange={(e) => setRoom({...room, roomtitle:e.target.value})}
                            rows="5"/>
                    </div>
                    <div>
                        <div align="left" className="smallTitle2">내용</div>
                        <textarea type="text" 
                            value={room.roomContent}
                            placeholder='일정 및 스터디 분야에 대한 내용을 상세히 기술해주세요'
                            onChange={(e) => setRoom({...room, roomContent:e.target.value})}
                            rows="10"/>
                    </div>
                        <input className="button" type="button" value={"방 개설하기"} onClick={submit}/>
                </div>
            </div>
        </>
    )
}

export default Makeroom;