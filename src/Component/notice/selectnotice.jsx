import { useEffect, useState } from 'react';
import './selectnotice.css'
import axios from "axios";
import { useParams } from 'react-router-dom';

const SelectNotice = () => {

    const roomId = useParams();
    const [notice, setNotice] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8080/room/selectroom/${roomId.id}`)
        .then(res=>{
            setNotice(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    console.log(notice);

    return(
        <div id='selectroom'> 
            <div className='main'>
                <div className='a'></div>
                <div className='title'>
                    {notice.roomTitle}
                </div>
                <div className='content'>
                    <section>
                        <ul>
                            <li>
                                <span className='span1'>모집 인원</span>
                                <span className='span2'>{notice.roomPersonnel}</span>
                            </li>
                            <li>
                                <span className='span1'>진행 방식</span>
                                <span className='span2'>{notice.roomOnline}</span>
                            </li>
                            <li>
                                <span className='span1'>진행 기간</span>
                                <span className='span2'>{notice.roomPeriod}</span>
                            </li>
                            <li>
                                <span className='span1'>모집 마감</span>
                                <span className='span2'>{notice.roomDeadline}</span>
                            </li>
                            {/* <li>
                                <span>모집인원</span>
                                <span>{notice.roomPersonnel}</span>
                            </li>
                            <li>
                                <span>모집인원</span>
                                <span>{notice.roomPersonnel}</span>
                            </li> */}
                        </ul>
                    </section>
                </div>
                <div className='box'>스터디 컨셉</div>
                <div className='studyroom'>
                    {notice.roomContent}
                </div>

                <div className='Button'>
                    <button>신청하기</button>
                </div>
            </div>
        </div>
    )
}

export default SelectNotice;