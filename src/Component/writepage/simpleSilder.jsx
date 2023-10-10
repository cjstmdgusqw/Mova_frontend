import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2>Single Item</h2>
        <Slider {...settings}>
          <div>
            <img
              src="이미지1의 경로"
              alt="이미지1"
              className="profileImg"
            />
          </div>
          <div>
            <img
              src="이미지2의 경로"
              alt="이미지2"
              className="profileImg"
            />
          </div>
          <div>
            <img
              src="이미지3의 경로"
              alt="이미지3"
              className="profileImg"
            />
          </div>
          {/* 나머지 이미지도 유사한 방식으로 추가 */}
        </Slider>
      </div>
    );
  }
}
