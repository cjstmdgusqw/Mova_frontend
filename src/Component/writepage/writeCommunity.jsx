import { useState, useRef, useEffect } from 'react';
import './writeCommunity.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios";
import { useParams } from 'react-router';

const WriteCommunity = () => {
    const [imgName, setImgName] = useState([]);
    const [community, setCommunity] = useState({ community_title: "", community_content: ""})
    const [imgFiles, setImgFiles] = useState([]);
    const [memberid, setMemberId] = useState();
    const roomid = useParams().id;
    const id = localStorage.getItem("id");

    const [file, setFile] = useState();

    const imgRef = useRef();

    useEffect(()=>{
        axios.get('http://localhost:8080/member/selectmemberID', {
            params : {
                id : id
            }
        })
        .then(res=>{
            setMemberId(res.data);
        })
        .catch(err=>{
            // console.log(err)
        })
    },[]);


    const selectimg = (e) => {
        const files = e.target.files;
        const newImgFiles = [];
        const processImage = (index) => {
            if (index >= files.length) {
                setImgFiles(prevImgFiles => [...prevImgFiles, ...newImgFiles]);
            } else {
                const file = files[index];
                setImgName(imgName => [...imgName, file.name]);
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        newImgFiles.push(reader.result);
                        processImage(index + 1); 
                    };
                    reader.readAsDataURL(file);
                }
            }
        };

        processImage(0);
    };

    const saveImgFile = (e) => {
        selectimg(e);
        setFile(e.target.files);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleSubmit = () => {
        if(community.community_title.trim() === ''){
            alert("제목을 작성해 주세요")
        }else if(community.community_content.trim() === ''){
            alert("내용을 작성해주세요")
        }else if(file.length === 0){
            alert("사진은 최소 1장이상 등록해야만 합니다")
        }else{
            const formData = new FormData();
            formData.append('title', community.community_title)
            formData.append('content', community.community_content)
            formData.append('filename', imgName);
            formData.append('memberid',memberid);
            Object.values(file).forEach((file)=> formData.append('file', file));
            axios.post(`http://localhost:8080/community/writefeed/${roomid}`, formData, {
                headers : {
                    "Content-Type": `multipart/form-data; `
                }
            })
            .then(res=>{
                console.log(res.data);
                window.location.replace(`http://localhost:3000/room/${roomid}`)
            })
            .catch(err=>{
                // console.log(err);
            })
        }
    }

    return (
        <div id="writecommunity">
            <div className="writecommunity">
                <div className='title'>
                    커뮤니티 글쓰기
                </div>
                <div>
                    <label htmlFor='file'>
                        {
                            imgFiles.length === 0 &&
                            <div className="profile"> + </div>
                        }
                    </label>
                    {
                        imgFiles.length !== 0 &&
                        <Slider {...settings}>
                            {imgFiles.map((imgfile, index) => (
                                <div key={index}>
                                    <div className='image-container'>
                                        <img
                                            src={imgfile}
                                            className="profileImg"
                                            alt={`Image ${index}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    }
                    {
                        imgFiles.length === 0 &&
                        <input type='file' className='file' id='file' accept='image/*' onChange={saveImgFile} ref={imgRef} multiple></input>
                    }
                </div>
                <div>
                    <div align="left" className="smallTitle2">제목</div>
                    <input className="contentTitle" type="text"
                        value={community.community_title}
                        placeholder='제목을 입력해주세요'
                        onChange={(e) => setCommunity({ ...community, community_title: e.target.value })}
                        rows="5" />
                </div>
                <div>
                    <div align="left" className="smallTitle2">내용</div>
                    <textarea type="text"
                        value={community.community_content}
                        placeholder='어떤 공부를 했는지 자세히 적어주세요'
                        onChange={(e) => setCommunity({ ...community, community_content: e.target.value })}
                        rows="10" />
                </div>
                <div className='buttonClick'>
                    <input type='button' className='button' value="뒤로가기"></input>
                    <input type='button' className='button2' value="작성하기" onClick={handleSubmit}></input>
                </div>
            </div>
        </div>
    )
}

export default WriteCommunity;
