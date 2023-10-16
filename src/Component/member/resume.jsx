import axios from "axios";
import { useState } from "react";

const Resume = () => {
    const [resume, setResume] = useState({age : "", phonenumber : "", title : "", content : "", memberid : localStorage.getItem("id")});

    const submit = () => {
        const formData = new FormData();
        formData.append('age', resume.age);
        formData.append('phonenumber', resume.phonenumber);
        formData.append('title', resume.title);
        formData.append('content', resume.content);
        formData.append('memberid', resume.memberid);
        axios.post("http://localhost:8080/resume/writeResume", formData)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    };

    return (
        <div className="resume" id="resume">
            <div className="writeResume">
            <h3 className="title">자신을 소개해 보세요</h3>
                <div className="roomgrid">
                    <div className="">
                        <div align="left" className="smallTitle">나이</div>
                        <input type="text" 
                        value={resume.age}
                        onChange={(e) => setResume({...resume, age:e.target.value})}></input>
                    </div>
                    <div>
                        <div align="left" className="smallTitle">전화번호</div>
                        <input type="text"
                        value={resume.phonenumber}
                        onChange={(e) => setResume({...resume, phonenumber:e.target.value})}
                        />
                    </div>
                </div>
                    <div>
                        <div align="left" className="smallTitle2">한줄 소개</div>
                        <input className="contentTitle" type="text" 
                            placeholder='한줄로서 자신의 다짐을 보여주세요'
                            value={resume.title}
                            onChange={(e) => setResume({...resume, title:e.target.value})}
                            rows="5"/>
                    </div>
                    <div>
                        <div align="left" className="smallTitle2">신청한 이유를 간단히 작성해주세요<span className="subname">  * 200자내외</span></div>
                        <textarea type="text" 
                        value={resume.content}
                            onChange={(e) => setResume({...resume, content:e.target.value})}
                            rows="10"/>
                    </div>
                    <input className="button" type="button" value={"이력서 작성 완료하기"} onClick={submit}/>
                </div>
            </div>
    )
}

export default Resume;