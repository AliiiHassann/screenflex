import React, { useEffect } from "react";
import "../styles/MainSlider.css";
import { useState } from "react";
import logo from "../assets/logo.690db83fedbc448aa5a0.png";
import Slider from "react-slick";
export const MainSlider = () => {
  const apiKey = "ecc873b12987a10135e029228ea7f72d";
  const [moviesList, setMoviesList] = useState([]);
  const getMovies = () =>
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setMoviesList(data.results);
      });
  // useEffect(() => {
  //   getMovies();
  // }, []);
  useEffect(() => {
    getMovies();
  }, []);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className='main-slider'>
      <div className='h-100 position-absolute top-0 start-0 p-0 w-100'>
        <Slider {...settings}>
          {moviesList.map((movie, i) => {
            return (
              <div key={i} className='w-100 h-100'>
                <div className='w-100 h-100'>
                  <img
                    className='main-slider-photo'
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt='No'
                  />
                </div>
                <div className='position-absolute layer d-flex align-items-start justify-content-center flex-column top-0 start-0 w-100 h-100'>
                  <div className='container poppins-bold'>
                    <h1 className='intro-main'>
                      Welcome To
                      <img
                        src={logo}
                        alt='No'
                        className='ms-3 main-logo-img overflow-hidden'
                        width={325}
                      />
                    </h1>
                    <h2 className=' h4 ps-0 text-white-50'>
                      Millions of movies, TV shows and people to discover.
                      Explore now.
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
