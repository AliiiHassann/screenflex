import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import RatingNumber from "../components/RatingNumber";
import MyLoader from "../components/MyLoader";
import { Helmet } from "react-helmet";
export const DiscoverTv = () => {
  const apiKey = "ecc873b12987a10135e029228ea7f72d";
  const [discoverTv, setDiscoverTv] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setreleaseYear] = useState("");
  const params = useParams();

  async function discover(page, sortBy, genre, releaseYear) {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&${sortBy}&include_adult=false&include_video=false&page=${page}&${releaseYear}${genre}&with_watch_monetization_types=flatrate`
    )
      .then((res) => res.json())
      .then((data) => setDiscoverTv(data.results));
    setIsLoading(false);
  }

  useEffect(() => {
    discover(page, sortBy, genre, releaseYear);
  }, [page, sortBy, genre, releaseYear]);

  function handlePage() {
    if (discoverTv.length < 20) {
      return;
    } else {
      const newPage = page + 1;
      setPage(newPage);
      discover(newPage, sortBy, genre, releaseYear);
    }
  }

  function handlePrevPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      discover(newPage, sortBy, genre, releaseYear);
    } else {
      return;
    }
  }

  function handleSortBy(sortBy) {
    setSortBy(sortBy);
    setPage(1);
  }

  function handleGenre(genre) {
    setGenre(genre);
    setPage(1);
  }
  function handleReleaseYear(releaseYear) {
    setreleaseYear(releaseYear);
    setPage(1);
  }
  function handleReset() {
    setPage(1);
    setGenre("");
    setSortBy("");
    setreleaseYear("");
    discover(page, sortBy, genre, releaseYear);
  }

  return (
    <>
      <Helmet>
        <meta
          name='description'
          content='Our website is a one-stop-shop for everything related to movies, TV shows, and actors. We have a vast collection of content, ranging from the latest blockbusters to classic movies and TV shows.'
        />
        <link
          rel='shortcut icon'
          href='../assets/logo.690db83fedbc448aa5a0.png'
          type='image/x-icon'
        />
        <title>Discover TV Shows</title>
      </Helmet>
      <div className='container-fluid discover-padding'>
        <div className='row'>
          <div className='col-lg-2 col-md-2 pt-5 mt-5'>
            <div className='accordion mb-3' id='accordionPanelsStayOpenExample'>
              <div className='accordion-item'>
                <h2 className='accordion-header'>
                  <button
                    className='accordion-button collapsed '
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#panelsStayOpen-collapseOne'
                    aria-expanded='true'
                    aria-controls='panelsStayOpen-collapseOne'
                  >
                    Sort by
                  </button>
                </h2>
                <div
                  id='panelsStayOpen-collapseOne'
                  className='accordion-collapse collapse'
                >
                  <div className='accordion-body d-flex flex-column'>
                    <Link
                      className='bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1'
                      onClick={() => handleSortBy("sort_by=popularity.desc")}
                    >
                      Popularity
                    </Link>
                    <Link
                      className='bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1'
                      onClick={() => handleSortBy("sort_by=release_date.desc")}
                    >
                      Release Date
                    </Link>
                    <Link
                      className='bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1'
                      onClick={() => handleSortBy("sort_by=revenue.desc")}
                    >
                      Revenue
                    </Link>
                    <Link
                      className='bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1'
                      onClick={() =>
                        handleSortBy("sort_by=primary_release_date.desc")
                      }
                    >
                      Primary Release Date
                    </Link>
                    <Link
                      className='bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1'
                      onClick={() => handleSortBy("sort_by=vote_average.desc")}
                    >
                      Vote Average
                    </Link>
                    <Link
                      className='bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1'
                      onClick={() => handleSortBy("sort_by=vote_count.desc")}
                    >
                      Vote Count
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <select
              className='form-select bg-light release-m-sm text-dark p-2 ps-3'
              onChange={(event) =>
                handleReleaseYear(`first_air_date_year=${event.target.value}`)
              }
            >
              <option>Release Dates</option>
              {Array.from({ length: 81 }, (_, i) => 1944 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <button
              onClick={handleReset}
              className='btn btn-outline-light w-100 mt-3'
            >
              Reset
            </button>
          </div>
          <div className='col-lg-10 col-md-10'>
            <div className='row discover-row mt-sm-5 gy-5 ms-2 me-2 justify-content-center'>
              <div className='col-12 d-flex justify-content-center '>
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
              {discoverTv?.map((media, index) => (
                <div
                  className='col-md-3 col-sm-6 col-6 p-1 overflow-hidden pointer position-relative'
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
      </div>
    </>
  );
};
