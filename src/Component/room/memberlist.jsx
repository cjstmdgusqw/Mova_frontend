import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Memberlist = () => {
    const params = useParams();
    const [teamMember, SetTeamMember] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/member/selectMember", {
            params : {
                state : 0,
                roomid : params.id
            }
        })
        .then(res=>{
            console.log(res.data);
            SetTeamMember(res.data);
        })    
        .catch(err=>{
            console.log(err);
        })
    },[params.id]);
    
    return (
        <div>
            
        </div>
    )
}

export default Memberlist;