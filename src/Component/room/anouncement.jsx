import { useEffect, useState } from 'react'
import './anouncement.css'
import axios from "axios";

const Anouncement = (Props) => {

    const [announcement,setAnnouncement] = useState([])

    const movePage = () => {
        window.location.replace(`http://localhost:3000/room/writeanouncement/${Props.roomid}`)
    }

    const sendDataToParent = () => {
        const data = "Data from child component";
        Props.onChildData(data); // 콜백 함수 호출하여 데이터 전달
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
            <div className='anouncement_title'>
                공지사항
            </div>
            <div className='anouncement'>
                <table>
                    <thead>
                        <th>글 번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성시간</th>
                        <th>조회수</th>
                    </thead>
                    <tbody>
                        {
                            announcement.map(list => {
                                return (
                                    <tr>
                                        <td>{list.announcement_id}</td>
                                        <td>{list.announcement_title}</td>
                                        <td>{list.room.member.nickname}</td>
                                        <td>{list.creation_date}</td>
                                        <td>{list.view_count}</td>
                                    </tr>       
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='write'>
                <input className='writeButton' type='button' value='글쓰기' onClick={movePage}/> 
            </div>

        </div>
    )

}

export default Anouncement;