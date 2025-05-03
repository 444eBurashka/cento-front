// ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FinanceLessonCard from './FinanceLessonCard';
import FinPrevArrow from './FinPrevArrow';
import FinNextArrow from './FinNextArroe';
import { payedLessons } from '../data';

const ImageSlider = (props) => {
  const data = payedLessons;
  const settings = {
    nextArrow: <FinNextArrow/>,
    prevArrow: <FinPrevArrow/>,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  return (
    <Slider className='FinSlider' {...settings}>
      {
        data.map((elem) => (
            <FinanceLessonCard Date={elem.date} Time={elem.time} theme={elem.theme} student={elem.student} subject={elem.subject}/>
        ))
      }
    </Slider>
  );
};

export default ImageSlider;