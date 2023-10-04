import { useEffect, useState } from 'react'
import './anouncement.css'
import axios from "axios";
import DetailAnnouncement from './detailAnnouncement';

const Anouncement = (Props) => {

    const [announcement,setAnnouncement] = useState([])
    const [show, setShow] = useState(false);

    const movePage = () => {
        window.location.replace(`http://localhost:3000/room/writeanouncement/${Props.roomid}`)
    }

    const sendData = () => {
        setShow(!show);
    }

    useEffect(() => {
        axios.get("http://localhost:8080/announcement/selectannouncement", {
            params:{
                id : Props.roomid
            }
        })
        .then(res=>{
            console.log(res.data);
            setAnnouncement([...announcement, ...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    },[Props.roomid])

    return (
        <div id='anouncement'>
            <div className={`anouncement_title ${show ? 'noshow' : 'show'}`}>
                공지사항
            </div>
            <div className={`anouncement ${show ? 'noshow' : 'show'}`}>
                <table>
                    <thead>
                        <tr>
                        <th width="30">작성시간</th>
                        <th width="30">글쓴이</th>
                        <th width="130">제목</th>
                        <th width="20">조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            announcement.map(list => {
                                return (
                                    <tr key={list.announcement_id} onClick={sendData}>
                                        <td width="50">{list.creation_date}</td>
                                        <td width="50">{list.room.member.nickname}</td>
                                        <td width="50">{list.announcement_title}</td>
                                        <td width="50">{list.view_count}</td>
                                    </tr>       
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className={`write ${show ? 'noshow' : 'show'}`}>
                <input className='writeButton' type='button' value='글쓰기' onClick={movePage}/> 
            </div>
            <div className={`announcementModal ${show ? 'show' : 'noshow'}`}>
                <DetailAnnouncement/>
            </div>

        </div>
    )

}

export default Anouncement;