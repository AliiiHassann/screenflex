import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import RatingNumber from "../components/RatingNumber";
import MyLoader from "../components/MyLoader";
import "../styles/Search.css";
function Search() {
  const apiKey = "ecc873b12987a10135e029228ea7f72d";
  const [searchData, setsearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const params = useParams();
  async function getMovies(params, page) {
    setIsLoading(true);
    fetch(`
    https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${params.query}&page=${page}&include_adult=false`)
      .then((res) => res.json())
      .then((data) => {
        setsearchData(data.results);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    getMovies(params, page);
  }, [params, page]);

  function handlePage() {
    if (searchData.length < 20) {
      return;
    } else {
      const newPage = page + 1;
      setPage(newPage);
      getMovies(params, newPage);
    }
  }

  function handlePrevPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      getMovies(params, newPage);
    }
  }
  return (
    <>
      <div className='container-fluid mt-5 mb-5 pt-5'>
        <div className='row ms-5 gy-5 justify-content-center'>
          <div className='col-12 d-flex justify-content-center mb-min20'>
            <button
              className='btn btn-light ps-4 pe-4 m-2'
              onClick={handlePrevPage}
            >
              <GrFormPreviousLink />
            </button>
            <span className='fw-bold fs-5 text-light p-3 d-flex text-center align-items-center'>
              Page {page}
            </span>
            <button
              className='btn btn-light ps-4 pe-4 m-2'
              onClick={handlePage}
            >
              <GrFormNextLink />
            </button>
          </div>
          {searchData.map((media, index) => {
            return (
              <div
                className='col-md-2 col-sm-4 col-6 p-1 overflow-hidden pointer position-relative'
                key={`${media.id}`}
              >
                {isLoading ? (
                  <MyLoader key={`loader-${index}`} className='col p-1' />
                ) : (
                  <Link
                    to={
                      media.media_type === "tv"
                        ? `/tv/${media.id}`
                        : `/movie/${media.id}`
                    }
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
                            {media.media_type.toUpperCase()}
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
                            {media.media_type.toUpperCase()}
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
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Search;
