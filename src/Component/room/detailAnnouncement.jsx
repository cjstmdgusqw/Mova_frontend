import axios from "axios";
import { useEffect } from "react";

const DetailAnnouncement = (Props) => {
    const roomid = Props.roomid;
    const announcementId = Props.announcement_id;
    useEffect(()=>{
        axios.get("http://localhost:8080/announcement/detailAnnouncement", {
            params:{
                roomid : roomid,
                announcementId : announcementId
            }
        })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[roomid, announcementId]);

    const Show = () => {
        Props.toggleShow();
    }

    return (
        <div id="detailannoun">
            
            <div className="detail">
            <div className='pre'>
                    <div className='prebutton' onClick={Show}>&lt;</div>
                </div>
            </div>
        </div>
    )
}

export default DetailAnnouncement;