import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useFetch from '../../../costomeHooks/useFetch';
import Image from '../../../components/lazyLoadingImage/Image';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import './heroBannerStyle.scss';

const HeroBanner = () => {
  const [background, setBackground] = useState(''); //state for herobanner background
  const [searchQuery, setSearchQuery] = useState(''); // for serach box

  const navigate = useNavigate();

  const home = useSelector((state) => state.home);
  const { url } = home;

  const { data, loading } = useFetch('/movie/upcoming');

  useEffect(() => {
    const backgroundChange =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(backgroundChange);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && searchQuery.length > 0) {
      navigate(`/search/${searchQuery}`);
    }
  };
  // console.log(searchQuery);

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-image">
          <Image src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies, Tv shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              value={searchQuery}
              placeholder="search for movies or tv shows...."
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
