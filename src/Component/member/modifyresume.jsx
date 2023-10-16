import { useEffect, useState } from 'react';
import './member.css';
import axios from 'axios';
import { useParams } from 'react-router';

const ModifyResume = () => {

    const initialData = {
        age: "",
        content: "",
        member: {
          filename: "",
          id: "",
          memberId: 0,
          name: "",
          nickname: "",
          password: "!",
        },
        memberid: null,
        phonenumber: "",
        resumeId: null,
        title: "",
    };

    const [data, setData] = useState(initialData);
    const resumeid = useParams().id;


    useEffect(()=>{
        axios.get("http://localhost:8080/resume/detailResume", {
            params : {
                resumeid : resumeid
            }
        })
        .then(res=>{
            setData(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[resumeid]);
    console.log(data);

    return (
        <div className="resume" id="detailresume">
            <div className="writeResume">
                <h3 className="title2">{data.member.name}님의 자기소개서</h3>
                <div className='total1'>
                    <div className='profileimg'>
                        <img className="profile" src={`http://localhost:8080/member/view/${data.member.filename}`} alt=""></img>
                    </div>
                    <div>
                        <div align="left" className='name'>이름 : {data.member.name}</div>
                        <div align="left" className='age'>나이 : {data.age}</div>
                        <div align="left" className='phonenumber'>전화번호 : {data.phonenumber}</div>
                    </div>
                </div>
                <div className='total2'>
                    <div align="left" className='title'>한줄 자기소개 : {data.title}</div>
                    <div align="left" className='content'>
                        <div className='content1'>팀에 지원한 이유</div>
                        <div className='content2'>{data.content}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModifyResume;