import axios from "axios";
import { useEffect, useState } from "react";
import './sub.css';
const Sub1 = (Props) => {
    const memberid = Props.id;
    const [roomlist, Setroomlist] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/room/selectcorrectroom",{
            params :{
                id : memberid
            }
        })
        .then(res=>{
            console.log(res.data);
            Setroomlist(res.data);
        })
        .catch(err=>{

        })
    },[memberid]);

    const moveRoom = (e) => {
        const roomId = e.currentTarget.getAttribute('data-roomid');
        window.location.replace(`http://localhost:3000/room/${roomId}`)
    }

    return (
        <div id="sub1">
            <div className="boxtitle">참여중인 방</div>
            <div id="tab">
                <div className="roomlist">
                    {
                        roomlist.map(room2=>{
                            return(
                                <div className="room" data-roomid={room2.roomId} key={room2.roomId} onClick={moveRoom}>
                                    <div className="writer">방장 : {room2.memberleader}</div>
                                    <div className="title">방 제목 : {room2.roomTitle} </div>
                                </div>
                            )
                        })
                    }
                  
                </div>
            </div>
        </div>
    )
}

export default Sub1;