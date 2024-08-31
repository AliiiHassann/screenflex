import React, { useEffect, useState } from "react";
import "../styles/Details.css";
import { Link, useLocation, useParams } from "react-router-dom";
import RatingNumber from "../components/RatingNumber";
import { FaArrowRight, FaCirclePlay } from "react-icons/fa6";
import Slider from "react-slick";
import settings from "../components/SliderSettings";
import MyLoader from "../components/MyLoader";
import "../styles/Details.css";
import TopShows from "../components/TopShows";
import MovieWeek from "../components/MovieWeek";
function Details() {
  const location = useLocation();
  const params = useParams();
  const apiKey = "ecc873b12987a10135e029228ea7f72d";
  const [mediaType, setMediaType] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(mediaType);
  const getMovies = () => {
    setIsLoading(true);
    fetch(`
    https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setMediaType(data);
      });
  };
  const getRecommendations = () => {
    fetch(
      `https://api.themoviedb.org/3/${params.mediaType}/${params.id}/recommendations?api_key=${apiKey}`
    ).then((res) => res.json().then((data) => setRecommendations(data)));
  };
  useEffect(() => {
    getMovies();
    getRecommendations();
    console.clear();
  }, [params, location.pathname]);
  return (
    <div className='main-bg position-relative'>
      <div className='p-3 position-relative'>
        <Link to={"/"} className='pe-4 home-link'>
          Home
        </Link>
        <Link
          to={params.mediaType === "movie" ? "/movies" : "/tv"}
          className='pe-4 category-link'
        >
          {params.mediaType === "movie" ? "Movie" : "Tv"}
        </Link>
        <span className='name-span text-white-50'>
          {mediaType.name || mediaType.title}
        </span>
      </div>
      <div className='container-fluid'>
        <div className='position-relative'>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${mediaType.backdrop_path}`}
            alt=''
            className='backdrop-img'
          />
          <div className='start-details'>
            <FaCirclePlay />
          </div>
          <div className='d-flex ps-5 auto-details'>
            <div className=' d-flex align-items-center input-flex'>
              <input
                className='m-1 input-details'
                id='auto-play'
                type={"checkbox"}
              />
              <label className='input-details' htmlFor='auto-play'>
                Auto Play
              </label>
            </div>
            <div className=' d-flex align-items-center input-flex'>
              <input
                className='m-1 input-details'
                id='auto-next'
                type={"checkbox"}
              />
              <label className='input-details' htmlFor='auto-next'>
                Auto Next
              </label>
            </div>
            <div className='d-flex align-items-center input-flex'>
              <input
                className='m-1 input-details'
                id='auto-skip'
                type={"checkbox"}
              />
              <label className='input-details' htmlFor='auto-skip'>
                Auto Skip
              </label>
            </div>
          </div>
        </div>
        <div className='row pt-5 align-items-center row-details'>
          <div className='col-xl-3'>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  mediaType.profile_path || mediaType.poster_path
                }`}
                alt=''
                className='img-fluid rounded-3 img-details'
              />
            </div>
          </div>
          <div className='col-xl-9 position-relative'>
            <div className='details-text pb-4'>
              <div className='text-white'>
                <h1>
                  {mediaType.name || mediaType.title}
                  <span className='opacity-75 h6 fw-normal ps-2'>
                    {mediaType.release_date || mediaType.birthday ? (
                      <>
                        (
                        {mediaType.release_date?.slice(0, 4) ||
                          mediaType.birthday?.slice(0, 4)}
                        )
                      </>
                    ) : (
                      <>
                        ({mediaType.first_air_date?.slice(0, 4)}-
                        {mediaType.last_air_date?.slice(0, 4)})
                      </>
                    )}
                  </span>
                </h1>
                {mediaType.genres ? (
                  <div className='genres d-flex mb-2'>
                    {mediaType.genres?.map((genre, index) => (
                      <p key={genre.id} className='mb-1'>
                        {(index ? ", " : "") + genre.name}
                      </p>
                    ))}
                  </div>
                ) : null}
                <p>{mediaType.place_of_birth}</p>
                <p className='overview-p position-relative p-1'>
                  {mediaType.overview || mediaType.biography}
                </p>
              </div>
              <div className='row w-100 justify-content-center align-items-center text-center gy-3 mt-4'>
                <div className=' col-sm-2 col-4 text-light d-flex flex-column align-items-center bg-screenflix '>
                  <p className='mb-1 fw-semibold'>Vote Average</p>
                  <RatingNumber
                    rating={mediaType.vote_average?.toFixed(1) || 0}
                  />
                </div>
                <div className='col-sm-2 col-4 bg-screenflix'>
                  <p className='mb-1 fw-semibold'>Vote Count</p>
                  <p className='mb-0 opacity-75'>{mediaType.vote_count}</p>
                </div>
                <div className='col-sm-2 col-4 bg-screenflix'>
                  <p className='mb-1 fw-semibold'>Popularity</p>
                  <p className='mb-0 opacity-75'>{mediaType.popularity}</p>
                </div>
                {mediaType.number_of_episodes ? (
                  <>
                    <div className='col-sm-2 col-4 bg-screenflix'>
                      <p className='mb-1 fw-semibold'>Seasons</p>
                      <p className='mb-0 opacity-75'>
                        {mediaType.number_of_seasons}
                      </p>
                    </div>
                    <div className='col-sm-2 col-4 bg-screenflix  '>
                      <p className='mb-1 fw-semibold'>Episodes</p>
                      <p className='mb-0 opacity-75'>
                        {mediaType.number_of_episodes}
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className='details-all-info pt-4'>
              <div className='d-flex px-5 justify-content-between pb-2'>
                <div className='text-white-50'>Type:</div>
                <span>{params.mediaType === "movie" ? "Movie" : "Tv"}</span>
              </div>
              <div className='d-flex px-5 justify-content-between pb-2'>
                <div className='text-white-50'>Country:</div>
                <span>{mediaType.origin_country}</span>
              </div>
              <div className='d-flex align-items-center px-5 justify-content-between pb-2'>
                <div className='text-white-50'>Genre:</div>
                {mediaType.genres ? (
                  <div className=' d-flex'>
                    {mediaType.genres?.map((genre, index) => (
                      <span key={genre.id}>
                        {(index ? ", " : "") + genre.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className='d-flex px-5 justify-content-between pb-2'>
                <div className='text-white-50'>Release:</div>
                <span className='text-white-50'>
                  {mediaType.release_date || mediaType.first_air_date}
                </span>
              </div>
              <div className='d-flex align-items-center px-5 justify-content-between pb-2'>
                <div className='text-white-50'>Production:</div>
                {mediaType.production_companies ? (
                  <div className=' d-flex'>
                    {mediaType.production_companies?.map((company, index) => (
                      <span className='span-details' key={index}>
                        {(index ? ", " : "") + company.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className='d-flex px-5 justify-content-between pb-2'>
                <div className='text-white-50'>Status:</div>
                <span>{mediaType.status}</span>
              </div>
              <div className='d-flex px-5 justify-content-between'>
                <div className='text-white-50'>Tagline:</div>
                <span className='tagline-details'>
                  {mediaType.tagline === "" ? "None" : mediaType.tagline}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='Slider container-fluid w-100 mt-5'>
          <span className='h3 text-decoration-none poppins-medium d-flex pb-3 justify-content-start position-relative ms-5 top-rated-a'>
            Recommendations
            <p className='more ms-3 h6 mb-0'>
              Explore More
              <div>
                <FaArrowRight />
              </div>
            </p>
          </span>
          <Slider {...settings} className='text-center'>
            {recommendations?.results?.map((movie, i) => {
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
                      onClick={(data) => {
                        window.scrollTo(0, 0);
                      }}
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
        {params.mediaType === "tv" ? <TopShows /> : <MovieWeek />}
      </div>
    </div>
  );
}

export default Details;
