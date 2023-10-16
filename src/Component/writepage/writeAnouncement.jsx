import './writeAnouncement.css'
import axios from "axios";
import { useState } from 'react';
import { useParams } from "react-router-dom";

const WriteAnouncement = () => {
    const params = useParams();
    const [announcement, setAnnouncement] = useState({announcement_title : "", announcement_content : "", room_id : 0})

    const submitanounce = () => {
        const formData = new FormData();
        formData.append('announcement_title', announcement.announcement_title);
        formData.append('announcement_content', announcement.announcement_content);
        formData.append('room_id', params.id);
        axios.post("http://localhost:8080/announcement/write", formData)
        .then(res=> {
            console.log(res.data)
            window.location.replace(`http://localhost:3000/room/${params.id}`)
        })
        .catch(err=>{
            // console.log(err);
        })
    }
    return (
        <div id="writeanouncement">
            <div className="writeanouncement">
                <div className='title'>
                    공지사항
                </div>
                <div>
                    <div align="left" className="smallTitle2">제목</div>
                    <input className="contentTitle" type="text"
                        value={announcement.announcement_title}
                        placeholder='공지사항 제목을 적어주세요'
                        onChange={(e) => setAnnouncement({...announcement, announcement_title : e.target.value})}
                        rows="5" />
                </div>
                <div>
                    <div align="left" className="smallTitle2">내용</div>
                    <textarea type="text"
                        value={announcement.announcement_content}
                        placeholder='일정 및 스터디 분야에 대한 내용을 상세히 기술해주세요'
                        onChange={(e) => setAnnouncement({...announcement, announcement_content : e.target.value})}
                        rows="10" />
                </div>
                <div className='buttonClick'>
                    <input type='button' className='button' value="뒤로가기"></input>
                    <input type='button' className='button2' value="작성하기" onClick={submitanounce}></input>
                </div>
            </div>
        </div>
    )
}

export default WriteAnouncement;