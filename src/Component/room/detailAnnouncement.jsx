import axios from "axios";
import { useEffect, useState } from "react";

const DetailAnnouncement = (Props) => {
    const roomid = Props.roomid;
    const announcementId = Props.announcement_id;
    const defaultAnnouncement = {
        announcement_content: "",
        announcement_id: null,
        announcement_title: "",
        creation_date: "",
        room: {
          member: {
            filename: "",
            id: "",
            memberId: 0,
            name: "",
            nickname: "",
            password: "",
          },
          roomContent: "",
          roomDeadline: "",
          roomId: 0,
          roomOnline: "",
          roomPeriod: "",
          roomPersonnel: "",
          roomTitle: "",
        },
        view_count: 0,
      };
    const [announcement, setAnnouncement] = useState(defaultAnnouncement);
    useEffect(()=>{
        axios.get("http://localhost:8080/announcement/detailAnnouncement", {
            params:{
                roomid : roomid,
                announcementId : announcementId
            }
        })
        .then(res=>{
            // console.log(res.data);
            setAnnouncement(res.data);
        })
        .catch(err=>{
            // console.log(err);
        })
    },[roomid, announcementId]);

    const Show = () => {
        Props.toggleShow();
    };

    return (
        <div id="detailannoun">
            <div className="detail">
                <div className='pre'>
                    <div className='prebutton' onClick={Show}>&lt;</div>
                    <div className="detail_title">{announcement.announcement_title}</div>
                    <pre className="detail_content">{announcement.announcement_content}</pre>
                    <div className="detail_bottom">
                        <div className="detail_writer">작성자 : {announcement.room.member.nickname}</div>
                        <div className="detail_date">작성날짜 : {announcement.creation_date}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailAnnouncement;