// ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FinanceLessonCard from './FinanceLessonCard';
import FinPrevArrow from './FinPrevArrow';
import FinNextArrow from './FinNextArroe';

const ImageSlider = ({ items = [], emptyMessage = "Нет данных" }) => {
    const settings = {
        nextArrow: <FinNextArrow />,
        prevArrow: <FinPrevArrow />,
        dots: true,
        infinite: items.length > 3,
        speed: 500,
        slidesToShow: Math.min(3, items.length),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: items.length > 3
    };

    if (items.length === 0) {
        return <div className="empty-slider-message">{emptyMessage}</div>;
    }

    return (
        <Slider className='FinSlider' {...settings}>
            {items.map((lesson) => (
                <FinanceLessonCard 
                    key={lesson.id}
                    Date={lesson.date} 
                    Time={lesson.time} 
                    theme={lesson.theme} 
                    student={lesson.student} 
                    subject={lesson.subject}
                    cost={lesson.cost}
                    isPaid={lesson.isPaid}
                    onPaymentClick={lesson.onPaymentClick}
                />
            ))}
        </Slider>
    );
};

export default ImageSlider;