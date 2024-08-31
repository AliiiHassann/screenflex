import React from "react";
import { Helmet } from "react-helmet";
import AiringToday from "./AiringToday";
import Footer from "./Footer";
import { MainSlider } from "./MainSlider";
import MovieWeek from "./MovieWeek";
import NowPlaying from "./NowPlaying";
import OnTheAir from "./OnTheAir";
import PopularMovies from "./PopularMovies";
import PopularTv from "./PopularTv";
import TopRated from "./TopRated";
import TopShows from "./TopShows";
import TopTv from "./TopTv";
import UpcomingMovies from "./UpcomingMovies";
const Home = () => {
  return (
    <>
      <Helmet>
        <meta
          name='description'
          content='Our website is a one-stop-shop for everything related to movies, TV shows, and actors. We have a vast collection of content, ranging from the latest blockbusters to classic movies and TV shows.'
        />
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <TopRated />
      <TopTv />
      <MovieWeek />
      <PopularMovies />
      <PopularTv />
      <TopShows />
      <NowPlaying />
      <AiringToday />
      <UpcomingMovies />
      <OnTheAir />
      <Footer />
    </>
  );
};

export default Home;
