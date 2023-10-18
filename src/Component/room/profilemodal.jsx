import { useParams } from 'react-router';
import './profilemodal.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
const Profilemodal = ({show, noshow, memberid2}) => {
    const memberid = useParams().id;
    const [filename, SetFilename] = useState("");
    const [memberId, SetmemberId] = useState();
    const [member, Setmember] = useState("");

    const closeModal = () => {
        noshow();
    };

    const Stopmodal = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/member/mypage`, {
            params: {
                id: memberid2
            }
        })
            .then(res => {
                SetFilename(res.data.filename);
                Setmember(prevMember => ({ ...prevMember, ...res.data }));
                SetmemberId(res.data.memberId);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [show, memberid]);

    const movepage = (e) => {
        const id = e.target.getAttribute("data");
        window.location.replace(`http://localhost:3000/modifyResume/${id}`)
    }
    return (
        <div className={`Profilemodal ${show ? 'show' : ''}`} id='profilemodal' onClick={closeModal}>
            <div className='profile' onClick={Stopmodal}>
                <img className="profile_picture" src={`http://localhost:8080/member/view/${member.filename}`} alt=""></img>
                <div className='profile_name'>이름 : {member.name}</div>
                <div className='profile_nickname'>닉네임 : {member.nickname}</div>
                <div className='profile_button'>
                    <input className='button' type='button' value="이력서 보기" data={member.memberId} onClick={movepage}></input>
                </div>
            </div>
        </div>
    )
}

export default Profilemodal; 