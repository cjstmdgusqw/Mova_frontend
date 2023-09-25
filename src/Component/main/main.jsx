// import axios from "axios";

import { useEffect, useState } from "react";
import axios from "axios";


const Main = () => {

    const [room, setRoom] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/room/selectAllroom")
            .then(res => {
                setRoom([...room, ...res.data]);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // const Selectroom = (e) => {
    //     const roomId = e.target.getAttribute("value");
    //     console.log(roomId);
    //     window.location.replace(`http://localhost:3000/room/${roomId}`);
    // }

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
                                        <div>
                                            {roomlist.roomId}
                                        </div>
                                    </div>
                                </a>

                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Main;
