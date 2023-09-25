import { useEffect } from 'react';
import './selectnotice.css'
import axios from "axios";
import { useParams } from 'react-router-dom';

const SelectNotice = () => {

    const roomId = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8080/room/selectroom/${roomId.id}`)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    return(
        <div id='selectroom'> 
            <div className='main'></div>
        </div>
    )
}

export default SelectNotice;