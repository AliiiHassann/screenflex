import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Details from "./pages/Details";
import Search from "./pages/Search";
import { Movies } from "./pages/Movies";
import { Tv } from "./pages/Tv";
import { DiscoverTv } from "./pages/DiscoverTv";
import { DiscoverMovies } from "./pages/DiscoverMovies";

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: `/:mediaType/:id`, element: <Details /> },
        { path: `/search/:query`, element: <Search /> },
        { path: "/movies", element: <Movies /> },
        { path: "/tv", element: <Tv /> },
        { path: "/discover/tv", element: <DiscoverTv /> },
        { path: "/discover/movies", element: <DiscoverMovies /> },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}

export default App;
