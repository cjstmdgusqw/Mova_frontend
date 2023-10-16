import { useState } from 'react';
import './roomlink.css'
import axios from 'axios';
import { useParams } from 'react-router';
const Roomlink = () => {
    const [linkValue, setLinkValue] = useState('');
    const roomid = useParams().id;
    const Apply = () => {
        console.log(typeof(linkValue));
        const formData = new FormData();
        formData.append('link', linkValue);
        formData.append('roomid', roomid)
        axios.post("http://localhost:8080/room/applylink/", formData)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    };

    const change = (e) => {
        setLinkValue(e.target.value);
    };
    return (
        <div className="link_room" id='link_room'>
            <div className='subtitle'>온라인 링크 등록하기</div>
            <input className="link" value={linkValue} onChange={change}></input>
            <input className='button' type='button' value="적용" onClick={Apply}></input>
        </div>
    )
}

export default Roomlink; 