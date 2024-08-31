import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import RatingNumber from "../components/RatingNumber";
import MyLoader from "../components/MyLoader";
import "../styles/Tv.css";
import { Helmet } from "react-helmet";

export const Tv = () => {
  const apiKey = "ecc873b12987a10135e029228ea7f72d";
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const params = useParams();
  async function getTopRated(params, page) {
    setisLoading(true);
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&query=${params.query}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => setTopRated(data.results));
    setisLoading(false);
  }
  async function getPopular(params, page) {
    setisLoading(true);
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&query=${params.query}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => setPopular(data.results));
    setisLoading(false);
  }
  async function getAiringToday(params, page) {
    setisLoading(true);
    fetch(
      `https://api.themoviedb.org/3/tv/now_playing?api_key=${apiKey}&language=en-US&query=${params.query}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => setAiringToday(data.results));
    setisLoading(false);
  }
  async function getOnTheAir(params, page) {
    setisLoading(true);
    fetch(
      `https://api.themoviedb.org/3/tv/onTheAir?api_key=${apiKey}&language=en-US&query=${params.query}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => setOnTheAir(data.results));
    setisLoading(false);
  }
  useEffect(() => {
    getTopRated(params, page);
    getPopular(params, page);
    getAiringToday(params, page);
    getOnTheAir(params, page);
  }, [params, page]);

  function handlePageReset() {
    setPage(1);
  }
  function handlePage() {
    if (
      topRated.length < 20 &&
      popular.length < 20 &&
      airingToday.length < 20 &&
      onTheAir.length < 20
    ) {
      return;
    } else {
      const newPage = page + 1;
      setPage(newPage);
      getTopRated(params, newPage);
      getPopular(params, newPage);
      getAiringToday(params, newPage);
      getOnTheAir(params, newPage);
    }
  }

  function handlePrevPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      getTopRated(params, newPage);
      getPopular(params, newPage);
      getAiringToday(params, newPage);
      getOnTheAir(params, newPage);
    }
  }
  return (
    <>
      <Helmet>
        <meta
          name='description'
          content='Our website is a one-stop-shop for everything related to movies, TV shows, and actors. We have a vast collection of content, ranging from the latest blockbusters to classic movies and TV shows.'
        />
        <link rel='shortcut icon' />
        <title>Tv Shows</title>
      </Helmet>
      <ul
        className='nav nav-tabs nav-movies mt-5 pt-5 pb-3 border-0 d-flex justify-content-center'
        id='myTab'
        role='tablist'
      >
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link active'
            id='topRated-tab'
            data-bs-toggle='tab'
            data-bs-target='#topRated-tab-pane'
            type='button'
            role='tab'
            aria-controls='topRated-tab-pane'
            aria-selected='true'
            onClick={handlePageReset}
          >
            Top Rated
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='popular-tab'
            data-bs-toggle='tab'
            data-bs-target='#popular-tab-pane'
            type='button'
            role='tab'
            aria-controls='popular-tab-pane'
            aria-selected='false'
            onClick={handlePageReset}
          >
            Popular
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='airingToday-tab'
            data-bs-toggle='tab'
            data-bs-target='#airingToday-tab-pane'
            type='button'
            role='tab'
            aria-controls='airingToday-tab-pane'
            aria-selected='false'
            onClick={handlePageReset}
          >
            Airing Today
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='onTheAir-tab'
            data-bs-toggle='tab'
            data-bs-target='#onTheAir-tab-pane'
            type='button'
            role='tab'
            aria-controls='onTheAir-tab-pane'
            aria-selected='false'
            onClick={handlePageReset}
          >
            On The Air
          </button>
        </li>
      </ul>

      <div className='tab-content' id='myTabContent'>
        <div
          className='tab-pane fade show active'
          id='topRated-tab-pane'
          role='tabpanel'
          aria-labelledby='topRated-tab'
          tabIndex='0'
        >
          <div className='row gy-5 ms-5 me-5 justify-content-center'>
            <div className='col-12 d-flex justify-content-center mb-min20'>
              <button
                className='btn btn-light ps-4 pe-4 m-2'
                onClick={handlePrevPage}
              >
                <GrFormPreviousLink />
              </button>
              <button
                className='btn btn-light ps-4 pe-4 m-2'
                onClick={handlePage}
              >
                <GrFormNextLink />
              </button>
            </div>
            {topRated?.map((media, index) => (
              <div
                className='col-md-2 col-sm-4 col-6 p-1 overflow-hidden pointer position-relative'
                key={`${media.id}`}
              >
                {isLoading ? (
                  <MyLoader key={`loader-${index}`} className='col p-1' />
                ) : (
                  <Link
                    to={`/tv/${media.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className=' text-decoration-none item top-rated-box'
                  >
                    {media.poster_path ? (
                      <div className='poster overflow-hidden position-relative rounded-2 search-hover'>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                          className='img-fluid'
                          alt='Media Poster'
                          title={media.title || media.name}
                          loading='lazy'
                        />
                        <div className='mediaType position-absolute d-flex flex-column'>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            {media.media_type}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            Pop: {media.popularity}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end '>
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='poster d-flex align-items-center overflow-hidden position-relative justify-content-center rounded-2 border'>
                        Poster Unavailable
                        <div className='mediaType position-absolute d-flex flex-column'>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            {media.media_type}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            Pop: {media.popularity}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end '>
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className='rate position-absolute end-0 m-1 p-2'>
                      <RatingNumber
                        rating={media.vote_average?.toFixed(1) || 0}
                      />
                    </div>
                    <div className='card-body text-center mt-2 p-1'>
                      <h2 className='h6 fw-bold'>
                        {media.title || media.name}
                      </h2>
                    </div>
                  </Link>
                )}
              </div>
            ))}
            <span className='fw-bold fs-5 text-light text-center pb-3'>
              Page {page}
            </span>
          </div>
        </div>
        <div
          className='tab-pane fade'
          id='popular-tab-pane'
          role='tabpanel'
          aria-labelledby='popular-tab'
          tabIndex='0'
        >
          <div className='row gy-5 ms-5 me-5 justify-content-center'>
            <div className='col-12 d-flex justify-content-center mb-min20'>
              <button
                className='btn btn-light ps-4 pe-4 m-2'
                onClick={handlePrevPage}
              >
                <GrFormPreviousLink />
              </button>
              <button
                className='btn btn-light ps-4 pe-4 m-2'
                onClick={handlePage}
              >
                <GrFormNextLink />
              </button>
            </div>
            {popular?.map((media, index) => (
              <div
                className='col-md-2 col-sm-4 col-6 p-1 overflow-hidden pointer position-relative'
                key={`${media.id}-${index}`}
              >
                {isLoading ? (
                  <MyLoader key={`loader-${index}`} className='col p-1' />
                ) : (
                  <Link
                    to={`/tv/${media.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className='text-decoration-none item top-rated-box'
                  >
                    {media.poster_path ? (
                      <div className='poster overflow-hidden position-relative rounded-2 search-hover'>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                          className='img-fluid'
                          alt='Media Poster'
                          title={media.title || media.name}
                          loading='lazy'
                        />
                        <div className='mediaType position-absolute d-flex flex-column'>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            Pop: {media.popularity}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end '>
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='poster d-flex align-items-center overflow-hidden position-relative justify-content-center rounded-2 border'>
                        Poster Unavailable
                        <div className='mediaType position-absolute d-flex flex-column'>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            Pop: {media.popularity}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end '>
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className='rate position-absolute end-0 m-1 p-2'>
                      <RatingNumber
                        rating={media.vote_average?.toFixed(1) || 0}
                      />
                    </div>
                    <div className='card-body text-center mt-2 p-1'>
                      <h2 className='h6 fw-bold'>
                        {media.title || media.name}
                      </h2>
                    </div>
                  </Link>
                )}
              </div>
            ))}
            <span className='fw-bold fs-5 text-light text-center pb-3'>
              Page {page}
            </span>
          </div>
        </div>
        <div
          className='tab-pane fade'
          id='airingToday-tab-pane'
          role='tabpanel'
          aria-labelledby='airingToday-tab'
          tabIndex='0'
        >
          <div className='row gy-5 ms-5 me-5 justify-content-center'>
            <div className='col-12 d-flex mb-min20 position-sticky justify-content-center'>
              <button
                className='btn btn-light ps-4 pe-4 m-2'
                onClick={handlePrevPage}
              >
                <GrFormPreviousLink />
              </button>
              <button
                className='btn btn-light ps-4 pe-4 m-2'
                onClick={handlePage}
              >
                <GrFormNextLink />
              </button>
            </div>
            {airingToday?.map((media, index) => (
              <div
                className='col-md-2 col-sm-4 col-6 p-1 overflow-hidden pointer position-relative item top-rated-box'
                key={`${media.id}-${index}`}
              >
                {isLoading ? (
                  <MyLoader key={`loader-${index}`} className='col p-1' />
                ) : (
                  <Link
                    to={`/tv/${media.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className=' text-decoration-none '
                  >
                    {media.poster_path ? (
                      <div className='poster overflow-hidden position-relative rounded-2'>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                          className='img-fluid'
                          alt='Media Poster'
                          title={media.title || media.name}
                          loading='lazy'
                        />
                        <div className='mediaType position-absolute d-flex flex-column'>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            Pop: {media.popularity}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end '>
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='poster d-flex align-items-center overflow-hidden position-relative justify-content-center rounded-2 border'>
                        Poster Unavailable
                        <div className='mediaType position-absolute d-flex flex-column'>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            Pop: {media.popularity}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end '>
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className='rate position-absolute end-0 m-1 p-2'>
                      <RatingNumber
                        rating={media.vote_average?.toFixed(1) || 0}
                      />
                    </div>
                    <div className='card-body text-center mt-2 p-1'>
                      <h2 className='h6 fw-bold'>
                        {media.title || media.name}
                      </h2>
                    </div>
                  </Link>
                )}
              </div>
            ))}
            <span className='fw-bold fs-5 text-light text-center pb-3'>
              Page {page}
            </span>
          </div>
        </div>
        <div
          className='tab-pane fade'
          id='onTheAir-tab-pane'
          role='tabpanel'
          aria-labelledby='onTheAir-tab'
          tabIndex='0'
        >
          <div className='row gy-5 ms-5 me-5 justify-content-center'>
            <div className='col-12 d-flex justify-content-center mb-min20'>
              <button
                className='btn btn-light ps-4 pe-4 m-2'
                onClick={handlePrevPage}
              >
                <GrFormPreviousLink />
              </button>
              <button
                className='btn btn-light ps-4 pe-4 m-2'
                onClick={handlePage}
              >
                <GrFormNextLink />
              </button>
            </div>
            {onTheAir?.map((media, index) => (
              <div
                className='col-md-2 col-sm-4 col-6 p-1 overflow-hidden pointer position-relative item top-rated-box'
                key={`${media.id}-${index}`}
              >
                {isLoading ? (
                  <MyLoader key={`loader-${index}`} className='col p-1' />
                ) : (
                  <Link
                    to={`/tv/${media.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className='text-decoration-none'
                  >
                    {media.poster_path ? (
                      <div className='poster overflow-hidden position-relative rounded-2'>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                          className='img-fluid'
                          alt='Media Poster'
                          title={media.title || media.name}
                          loading='lazy'
                        />
                        <div className='mediaType position-absolute d-flex flex-column'>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            Pop: {media.popularity}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end '>
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className='poster d-flex align-items-center overflow-hidden position-relative justify-content-center rounded-2 border'>
                        Poster Unavailable
                        <div className='mediaType position-absolute d-flex flex-column'>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end mb-2'>
                            Pop: {media.popularity}
                          </span>
                          <span className='mediaType fw-semibold text-dark p-1 rounded-end '>
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className='rate position-absolute end-0 m-1 p-2'>
                      <RatingNumber
                        rating={media.vote_average?.toFixed(1) || 0}
                      />
                    </div>
                    <div className='card-body text-center mt-2 p-1'>
                      <h2 className='h6 fw-bold'>
                        {media.title || media.name}
                      </h2>
                    </div>
                  </Link>
                )}
              </div>
            ))}
            <span className='fw-bold fs-5 text-light text-center pb-3'>
              Page {page}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
