import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { fetchDataFromApi } from './utils/api';
import { getApiConfiguration, getGenres } from './Store/homeSlice';
import {
  Home,
  Details,
  SearchResult,
  Explore,
  PageNotFound,
} from './screens/allScreenExport';

import { Header, Footer } from './components/allComponentsExport';

const App = () => {
  const dispatch = useDispatch();

  const home = useSelector((state) => state.home);
  const { url } = home;

  useEffect(() => {
    fetchApiConfig();
    generesCall();
  }, []);

  const fetchApiConfig = async () => {
    const result = await fetchDataFromApi('/configuration');
    // console.log(result);

    const allImageWithSize = {
      backdrop: result.images.secure_base_url + 'original',
      poster: result.images.secure_base_url + 'original',
      profile: result.images.secure_base_url + 'original',
    };

    dispatch(getApiConfiguration(allImageWithSize));
  };

  //promiss all  logic means calling more then one api for genre tv shows and movie
  const generesCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGeneres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGeneres[item.id] = item));
    });

    // console.log(allGeneres);
    dispatch(getGenres(allGeneres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

// https://www.youtube.com/watch?v=VLgVw2NEqCM

// 5:30 MINUTES

// https://developer.themoviedb.org/reference/intro/getting-started
