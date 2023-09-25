import React, { useState } from "react";
import axios from "axios";

const Login = () => {

    const [member, setMember] = useState({id : "", password : ""})
    const handleSubmit = () => {
        axios.post("http://localhost:8080/member/login",{
            id : member.id,
            password : member.password
        })
        .then(res=>{
            console.log(res);
            localStorage.setItem("id", member.id)
            window.location.replace("/");
        })
        .catch(err=>{
            alert("회원 정보가 올바르지 않습니다")
            console.log(err);
        })
    }

   
    return (
        <>
            <div id="login">
                <div className="loginBox">
                    <h3 className="title">로그인</h3>
                    <input type="text"
                        placeholder="아이디"
                        value={member.id}
                        onChange={(e) => setMember({ ...member, id: e.target.value })}
                    />
                    <input type="password"
                        placeholder="비밀번호"
                        value={member.password}
                        onChange={(e) => setMember({ ...member, password: e.target.value })}
                    />
                    <input className="button" type="button" value={"제출"} onClick={handleSubmit} />
                    
                </div>
            </div>
        </>
    )
}

export default Login;