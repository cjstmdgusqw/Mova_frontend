import React, { useState, useRef } from "react";
import axios from "axios";
import './member.css';

const Join = () => {
  const [member, setMember] = useState({name: "",Id: "",password: "", password2 : "", nickname: "", filename : ""});
  const [imgFile, setImgFile] = useState("");

  const [file, setFile] = useState();
  const imgRef = useRef();

  const selectImg = (e) => {
    const imgFile = e.target;
    const file = imgFile.files[0];
    if (imgFile.files && imgFile.files[0]) {
        const reader = new FileReader()
        reader.onload = () => {
          setImgFile(reader.result);
        }
        reader.readAsDataURL(file);
    }
  }

  const handleSubmit = () => {
    if(member.password.trim() !== member.password2.trim()){
      alert("비밀번호가 일치하지 않습니다");
    }else if(member.name.trim() === ''){
      alert("이름을 입력해주세요");
    }else if(member.Id.trim()===''){
      alert("아이디를 입력해주세요");
    }else if(member.nickname.trim()===''){
      alert("닉네임을 입력해주세요");
    }else{
      const formData = new FormData();
      formData.append('name', member.name);
      formData.append('Id', member.Id);
      formData.append('password', member.password); 
      formData.append('nickname', member.nickname);
      formData.append("filename", member.filename)
      formData.append('file', file);
      axios.post("http://localhost:8080/member/signup", formData)
      .then(res=>{
          console.log(res);
          alert("회원가입 되었습니다");
          window.location.replace("/login");
      })
      .catch(err=>{
          console.log(err);
      })
    }
  };

  const saveImgFile = (e) => {
    selectImg(e)
    console.log(e);

    setFile(e.target.files[0]);

    setMember({...member, 'filename' : e.target.files[0].name});
  };

  return (
    <div id="sign">
      <div className="signupBox"> 
        <h3 className="title">회원가입</h3>
        <label htmlFor="file">
          {
            imgFile === "" && 
            <div className="profile"> + </div>
          }
          {
            imgFile !== "" &&
            <img
            src={imgFile ? imgFile : ``}
            className="profileImg"
          />
          }
        </label>
        
       
        <input className="hidden" type="file" id="file" accept="image/*" onChange={saveImgFile} ref={imgRef}></input>
        <input type="text"
          placeholder="이름"
          value={member.name}
          onChange={(e) => setMember({...member, name:e.target.value})}
        />
        <input type="text"
          placeholder="아이디"
          value={member.Id}
          onChange={(e) => setMember({ ...member, Id: e.target.value })}
        />
        <input type="password"
          placeholder="비밀번호"
          value={member.password}
          onChange={(e) => setMember({ ...member, password: e.target.value })}
        />
        <input type="password"
          placeholder="비밀번호 확인"
          value={member.password2}
          onChange={(e) => setMember({ ...member, password2: e.target.value })}
        />
        <input type="text"
          placeholder="닉네임"
          value={member.nickname}
          onChange={(e) => setMember({ ...member, nickname: e.target.value })}
        />
        <input  className = "button" type="button" value={"회원가입"} onClick={handleSubmit} />
        
      </div>
    </div>
  );
};

export default Join;
