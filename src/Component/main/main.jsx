// import axios from "axios";

import { useEffect, useState } from "react";
import axios from "axios";


const Main = () => {

    const [room, setRoom] = useState([])
    const memberid = localStorage.getItem("id");
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/room/selectAllroom")
            .then(res => {
                setRoom([...room, ...res.data]);
                // console.log(res.data);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:8080/resume/selectResume", {
            params :{
                memberid : memberid
            }
        })
        .then(res=>{
            console.log(res.data.length);
            console.log(memberid);
            if(res.data.length === 0 && memberid !==null){
                setShow(true);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[memberid]);

    const movePage = () => {
        window.location.replace("http://localhost:3000/writeResume");
    };

    const shooff = () => {
        setShow(false);
    }

    return (
        <>
            <div id="main">
                
                <div className="mainTitle">같이 스터디할 멤버들을 찾아보세요</div>
                <div className="main">
                    {
                        room.map(roomlist => {
                            return (
                                <a className="a" key={roomlist.roomId} href={`http://localhost:3000/selectnotice/${roomlist.roomId}`}>
                                    <div className="list" value={roomlist.roomId} >
                                        <div className="roomDeadline">
                                            마감일 | {roomlist.roomDeadline}
                                        </div>

                                        <div className="roomContent">
                                            {roomlist.roomTitle}
                                        </div>

                                        <div className="roomPersonel">
                                            <div>
                                                진행방법 : {roomlist.roomOnline}
                                            </div>
                                            <div>
                                                인원 수 : {roomlist.roomPersonnel}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </a>

                            )
                        })
                    }
                </div>
                <div className={`modal ${show ? 'show' : ''}`}>
                    <div className="submodal">
                        <div className="modaltext">'자기소개서'를 간단히 작성해주세요</div>
                        <div className="modalbutton" onClick={movePage}>
                            작성하러가기
                        </div>
                        <div className="modaltext2" onClick={shooff}>
                            공고부터 둘러볼래요.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;
