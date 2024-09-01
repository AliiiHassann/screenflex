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
              <div
                key={i}
                className='position-absolute top-0 start-0 w-100 h-100 text-decoration-none slider p-0 w-100 h-100'
              >
                <div
                  style={{
                    background: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                    width: "100%",
                    height: "100%",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                  }}
                >
                  <div className='position-absolute layer d-flex align-items-start justify-content-center flex-column top-0 start-0 w-100 h-100'>
                    <div className='container poppins-bold'>
                      <h1 className='intro-main mb-3'>
                        Welcome <span className='ms-3'> To </span>
                        <img
                          src={logo}
                          alt='No'
                          className='ms-3 main-logo-img overflow-hidden'
                          width={325}
                        />
                      </h1>
                      <h4 className=' ps-0 text-white-50 intro-h4'>
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                      </h4>
                    </div>
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
