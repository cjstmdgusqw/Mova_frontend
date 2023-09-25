import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './room.css';
import Comunity from "./comunity";
import Anouncement from "./anouncement";

const Selectroom = () => {
    const params = useParams();
    let [component, setComponent] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:8080/room/selectroom/${params.id}`)
        .then(res=>{
            console.log(res.data);
        })    
        .catch(err=>{
            console.log(err);
        })
    },[params.id])

    console.log(component);

    const Change = (e) => {
        setComponent(e.target.getAttribute("value"));
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
                    <div className="menu3">
                        <a>온라인바로가기</a>
                    </div>  
                </div>
                <div className="room">  
                    {
                        component === "공지사항" && 
                        (
                         <Comunity/>
                        )
                        
                    }
                    {
                        component === "공부 기록방" && 
                       (
                        <Anouncement/>
                       )
                    }
                    {
                        component === "" && 
                        (
                            <></>
                        )
                    }
                </div>
            </div>
        </div>
    )

}   

export default Selectroom;