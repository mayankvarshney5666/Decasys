import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderComponent.css'; // Custom styles for slider

export default function SliderComponent() {
  const [homeslider, setSlider] = useState();
  const [homeslider1, setSlider1] = useState();
  const [category, setcategory] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const imgurl = process.env.REACT_APP_IMAGE_URL;
  const getAllSlider = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllSlider`
    );
    const result = await resource.json();
    setSlider(result?.slider);
  }
  const getAllSlider1 = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllSliderMobile`
    );
    const result = await resource.json();
    setSlider1(result?.slider);
  }
  const getcategory = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllcategory`
    );
    const result = await resource.json();
    setcategory(result?.category);
  }
  useEffect(() => {
    getAllSlider()
    getAllSlider1();
    getcategory()
  }, [])
  const [activeTab, setActiveTab] = useState(0);
  //  const tabs = ['Sports Suplements 20% off', 'Lotion 20% off']; // Tab labels
  const settings = {

    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    afterChange: (index) => {
      setActiveTab(index);
    }
  };
  const handleTabHover = (index) => {
    setActiveTab(index);
    slider.slickGoTo(index); // Go to the corresponding slide when hovering over a tab
  };

  let slider;

  return (
    <>
      <Slider ref={(c) => (slider = c)} {...settings} className="slick-list Mobile">
        {homeslider1?.map((homeslider2, index) => (
          <div key={index}>
            <Link to="/brand/65e06a4b299335f107e67b14">
              <img
                src={`${imgurl}/${homeslider2?.image_name}`}
                className="d-block w-100 main-slider-img"
                alt="..."
              />
            </Link>
          </div>
        ))}
      </Slider>

      <Slider ref={(c) => (slider = c)} {...settings} className="slick-list Desktop">
        {homeslider?.map((homeslider1, index) => (
          <div key={index}>
            <Link to="/brand/65e06a4b299335f107e67b14">
              <img
                src={`${imgurl}/${homeslider1?.image_name}`}
                className="d-block w-100 main-slider-img"
                alt="..."
              />
            </Link>
          </div>
        ))}
      </Slider>
      <div className="tabs" style={{}}

      >
        {homeslider?.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'tab active' : 'tab'}
            onMouseEnter={() => handleTabHover(index)}
          >
            {tab?.slider_name}
          </button>
        ))}
      </div>
    </>
  );
}
