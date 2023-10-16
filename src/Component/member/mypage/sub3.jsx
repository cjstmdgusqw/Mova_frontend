import axios from "axios";
import { useEffect, useState } from "react";

const Sub3 = () => {
    const [resumelist, SetResumelist] = useState([]);
    const memberid = localStorage.getItem("id");

    useEffect(()=>{
        axios.get("http://localhost:8080/resume/selectResume", {
            params :{
                memberid : memberid
            }
        })
        .then(res=>{
            console.log(res.data);
            SetResumelist(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[memberid]);


    const moveRoom = (e) => {
        const resumeid = e.currentTarget.getAttribute('data-resumeid');
        window.location.replace(`http://localhost:3000/modifyResume/${resumeid}`)
    }

    return (
        <div id="sub3">
            <div className="boxtitle3">이력 관리</div>
            <div className="roomlist3">
                {
                    resumelist.map(resume=>{
                        return(
                            <div className="room" key = {resume.resumeId} data-resumeid={resume.resumeId} onClick={moveRoom}>
                                <div className="title">소개서 제목 : {resume.title} </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sub3;