import React, { useEffect, useState } from "react";
import "../styles/TopRated.css";
import { FaArrowRight } from "react-icons/fa";
import RatingNumber from "./RatingNumber";
import MyLoader from "./MyLoader";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import settings from "./SliderSettings";
import { Fade } from "react-reveal";

function TopRated() {
  const apiKey = "ecc873b12987a10135e029228ea7f72d";
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getMovies = () => {
    setIsLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setMoviesList(data.results);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <Fade>
        <div className='pt-3'>
          <div className='container-fluid'>
            <a
              href=''
              className='h3 text-decoration-none poppins-medium d-flex pb-3 justify-content-start position-relative ms-5 top-rated-a '
            >
              Top Rated Movies
              <p className='more ms-3 h6 mb-0'>
                Explore More
                <div>
                  <FaArrowRight />
                </div>
              </p>
            </a>
            <div className='scale-up-center'>
              <Slider {...settings} className='text-center'>
                {moviesList.map((movie, i) => {
                  return (
                    <div key={i} className='position-relative '>
                      {isLoading ? (
                        <MyLoader />
                      ) : (
                        <Link
                          to={
                            movie.media_type === "tv"
                              ? `/tv/${movie.id}`
                              : `/movie/${movie.id}`
                          }
                          className='top-rated-box'
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <div className='rounded-2 overflow-hidden top-img-holder '>
                            <img
                              className='img-fluid bg-secondary '
                              src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                              alt='No'
                              loading='lazy'
                            />
                          </div>
                          <div className='rate end-0 m-1 position-absolute '>
                            <div className='rate-number'>
                              <RatingNumber
                                rating={movie.vote_average.toFixed(1)}
                              />
                            </div>
                          </div>
                          <div className='mt-2 p-1 text-center'>
                            <h4 className=' h6 title-h4 '>{movie.title}</h4>
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default TopRated;
