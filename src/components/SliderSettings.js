import React from "react";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: "0.6",
        position: "absolute",
        width: "10px",
        height: "10px",
        borderTop: "2px solid hsla(0, 100%, 50%, 0.8)",
        borderRight: "2px solid hsla(0, 100%, 50%, 0.8)",
        transform: "translate(-50%, -50%) rotate(45deg)",
        left: "50%",
        top: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: "0.6",
        position: "absolute",
        width: "10px",
        height: "10px",
        borderBottom: "2px solid hsla(0, 100%, 50%, 0.8)",
        borderLeft: "2px solid hsla(0, 100%, 50%, 0.8)",
        transform: "translate(-50%, -50%) rotate(45deg)",
        left: "50%",
        top: "50%",
      }}
      onClick={onClick}
    />
  );
}
const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 10,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  speed: 500,
  arrows: true,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,
  autoplaySpeed: 5000,
  cssEase: "linear",

  responsive: [
    {
      breakpoint: 1650,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export default settings;
