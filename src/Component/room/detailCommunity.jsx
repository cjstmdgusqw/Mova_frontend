import { useEffect, useState } from 'react';
import './community.css';
import './detailCommunity.css';
import axios from "axios";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { useParams } from 'react-router';
import Profilemodal from './profilemodal';

const DetailCommunity = ({ show, noshow, communityid }) => {
  const memberid = localStorage.getItem("id");
  const roomid = useParams().id;
  const defaultDetailFeed = {
    community_id: 0,
    content: '',
    filename: '',
    like_count : 0,
    member: {
      filename: '',
      nickname: '',
    },
    title: ''
  };

  const [detailfeed, SetDetailFeed] = useState(defaultDetailFeed);
  const [comment, setComment] = useState("");
  const [memberId, setMemberId] = useState();
  const [commentData, setCommentData] = useState([]);

  const [like, setLike] = useState(false);

  const [show2, setShow2] = useState(false);

  const closeModal = () => {
    noshow();
  };
  const Stopmodal = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    axios.get("http://localhost:8080/member/selectmemberID", {
      params: {
        id: memberid
      }
    })
    .then(res => {
      setMemberId(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, [memberid, communityid]);

  const check = () => {

  }

  // 주기적으로 댓글 업데이트를 요청하는 함수
  const fetchCommentUpdates = () => {
    axios.get("http://localhost:8080/community/selectcomment", {
      params: {
        communityId: communityid
      }
    })
    .then(res => {
      setCommentData(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  };
  useEffect(() => {
    if (show === true) {
      axios.get("http://localhost:8080/community/detailfeed", {
        params: {
          communityId: communityid
        }
      })
      .then(res => {
        SetDetailFeed(res.data);
      })
      .catch(err => {
        // console.log(err);
      });
      fetchCommentUpdates();

      const intervalId = setInterval(() => {
        fetchCommentUpdates();
      }, 500);
  
      return () => {
        clearInterval(intervalId);
      };
    }

    axios.get("http://localhost:8080/community/checklike", {
      params : {
        communityId : communityid,
        memberId : memberId
      }
    })
    .then(res=>{
      if(res.data === 1) {
        setLike(true);
      }else{
        setLike(false);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }, [show, communityid]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
  };

  const goodSticker = () => {
    setLike(!like);
    if(like === false){
      axios.get("http://localhost:8080/community/increaselike", {
        params : {
          communityId : communityid,
          memberId : memberId
        }
      })
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    }else if(like === true){
      axios.get("http://localhost:8080/community/decreaselike", {
        params : {
          communityId : communityid,
          memberId : memberId
        }
      })
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    }
  };

  const writeComment = (e) => {
    setComment(e.target.value);
  };

  const submitComment = () => {
    if (comment === "") {
      alert("댓글을 작성해주세요");
    } else {
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("memberid", memberId);
      formData.append("community_id", communityid);
      formData.append("roomid", roomid);
      axios.post("http://localhost:8080/community/writecomment", formData)
        .then(res => {
          console.log(res.data);
          setComment("");
        })
        .catch(err => {
          console.log(err);
        });
    }
    
  
  };

  const openModal = (e) => {
    setShow2(true);
    console.log(e.target.getAttribute("value"));
  }

  const noprofileShow = () => {
    setShow2(false);
  }

  return (
    <div id="community_modal" className={`community_modal ${show ? 'show' : ''}`} onClick={closeModal}>
      <div className="detail_modal" onClick={Stopmodal}>
        <div className='detail_total'>
          <div className='detail_profile'>
            <div>
              <img className="profile_image" src={`http://localhost:8080/member/view/${detailfeed.member.filename}`} alt=""></img>
            </div>
            <div className="profile_name">{detailfeed.member.nickname}</div>
          </div>
          <div className='detail_picture'>
            <Slider {...settings}>
              {(detailfeed.filename.split(",")).map((imgfile, index) => (
                <div key={index}>
                  <div className='image-container'>
                    <img
                      src={`http://localhost:8080/member/view/${imgfile}`}
                      className="profileImg"
                      alt={`Image ${index}`}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className='detail_button'>
            {
              like === false && 
                <div className='detail_like_before' onClick={goodSticker}>
                  <FcLikePlaceholder className='like' /> 칭찬해요
                </div>
            }
            {
              like === true &&
              <div className='detail_like' onClick={goodSticker}>
                <FcLike className='like' /> 칭찬해요
              </div>
            }

           
          </div>
          <div className='detail_content'>
            {detailfeed.content}
          </div>
        </div>
        <div className='detail_total2'>
          <div className='detail_comment'>
            {
              commentData.map((comment, index) => (
                <div className='detial_comment2' key={index}>
                  <div>
                    <img className="profile_image_comment" src={`http://localhost:8080/member/view/${comment.filename}`} alt="" onClick={openModal} value={comment.memberid}></img>
                  </div>
                  <div className='commentContent'>
                    <div className='commentProfile'>
                      <div className='writer_comment'>{comment.writer}</div>
                    </div>
                    <div className='content_comment'>{comment.comment}</div>
                  </div>
                  <Profilemodal show={show2} noshow={noprofileShow} memberid2={comment.memberid}/>
                </div>
                
              ))
            }
          </div>
          <div className='detail_commentwrite'>
            <input type='text' className='commentWrite' onChange={writeComment} value={comment}></input>
            <input type='button' value="작성" className='commentButton' onClick={submitComment}></input>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default DetailCommunity;
