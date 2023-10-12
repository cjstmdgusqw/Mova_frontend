import { useEffect, useState } from 'react';
import './community.css'
import './detailCommunity.css'
import axios from "axios";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiFillLike } from 'react-icons/ai';

const DetailCommunity = ({show, noshow, communityid}) => {
    const defaultDetailFeed = {
        community_id : 0,
        content : '',
        filename : '',
        member: {
          filename: '',
          nickname: '',
        },
        title : ''
      };
    const [detailfeed, SetDetailFeed] = useState(defaultDetailFeed);

    const closeModal = () => {
        noshow();
    }
    const Stopmodal = (e) => {
        e.stopPropagation();
    }
    useEffect(()=>{
        if(show == true) {
            axios.get("http://localhost:8080/community/detailfeed", {
            params : {
                communityId : communityid
            }
            })
            .then(res=>{
                console.log(res.data);
                SetDetailFeed(res.data);
            })
            .catch(err=>{
                // console.log(err);
            })
        }
    },[communityid]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow : true,
    };
    

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
                    <div className='detail_content'>
                        {detailfeed.content}
                    </div>
                    <div className='detail_button'>
                    <AiFillLike />
                    </div>
                </div>
                <div className='detail_total2'>
                    <div className='detail_comment'></div>
                    <div className='detail_commentwrite'>
                    </div>
                </div>
               
            </div>
        </div>  
    )
}



export default DetailCommunity;