import axios from "axios";
import { useEffect, useState } from "react";
import './sub.css';

const Sub2 = (Props) => {
    const memberid = Props.id;
    const [roomlist, SetRoomlist] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8080/room/selectmypage",{
            params :{
                id : memberid,
                state : 2
            }
        })
        .then(res=>{
            console.log(res.data);
            SetRoomlist(res.data);
        })
        .catch(err=>{

        })
    },[memberid]);


    const moveRoom = (e) => {
        const roomId = e.currentTarget.getAttribute('data-roomid');
        window.location.replace(`http://localhost:3000/room/${roomId}`)
    }
    return (
        <div id="sub2">
            <div className="boxtitle2">개설한 방</div>
            <div className="roomlist2">
                {
                    roomlist.map(room=>{
                        return(
                            <div className="room" key = {room.roomId} data-roomid={room.roomId} onClick={moveRoom}>
                                <div className="title">방 제목 : {room.roomTitle} </div>
                               
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sub2;