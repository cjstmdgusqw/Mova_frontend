import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './room.css';
import Comunity from "./comunity";
import Anouncement from "./anouncement";
import Memberlist from "./memberlist";
import Roomlink from "./roomlink";


const Selectroom = () => {
    const params = useParams();
    let [component, setComponent] = useState("공지사항");
    const memberId = localStorage.getItem("id");
    const [topmember, setTopmember] = useState();
    const [link, setLink]=useState("");

    useEffect(()=>{
        axios.get(`http://localhost:8080/room/selectroom/${params.id}`)
        .then(res=>{
            console.log(res.data);
            setTopmember(res.data.member.id);
            setLink(res.data.link);
        })
        .catch(err=>{
            // console.log(err);
        });
    },[params.id])

    const Change = (e) => {
        const value = e.target.getAttribute("value")
        setComponent(value);
    }

    const handleChildData = (data) => {
        console.log("Data from child:", data);
    }

    return (
        <div id="Room">
            <div className="main">
                <div className="sidebar"> 
                    <div className="menu1">
                        <div 
                        value = "공지사항"
                        onClick={Change}>공지사항</div>
                    </div>  
                    <div className="menu2">
                        <div 
                        value = "공부 기록방"
                        onClick={Change}>공부 기록방</div>
                    </div>  

                    {
                        memberId === topmember && 
                        <div className="menu3">
                            <div 
                            value = "방 등록"
                            onClick={Change}>온라인 링크 등록</div> 
                         </div>
                    }
               
                    {
                        memberId != topmember && 
                        <div className="menu3">
                            <a href={`${link}`}>온라인바로가기</a>
                        </div> 
                    }
                   
                    {
                        memberId == topmember &&
                        <div className="menu4">
                            <div
                            value = "멤버리스트"
                            onClick={Change}>멤버리스트</div>
                        </div>
                    }
                </div>
                <div className="room">  
                    {
                        component === "공지사항" &&
                        (
                            <Anouncement roomid={params.id} topmember={topmember} onChildData={handleChildData} />
                        )
                        
                    }
                    {
                        component === "공부 기록방" && 
                       (
                            <Comunity roomid={params.id}/> 
                       )
                    }
                    {
                        component === "멤버리스트" && memberId == topmember &&
                        (
                            <Memberlist/>
                        )
                    }
                    {
                        component === "방 등록" && memberId == topmember &&
                        (
                            <Roomlink/>
                        )
                    }
                </div>
            </div>
        </div>
    )

}   

export default Selectroom;