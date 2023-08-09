import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose, VscChromeRestore } from 'react-icons/vsc';
import { useNavigate, useLocation } from 'react-router-dom';

import './headerStyle.scss';
import logo from '../../assets/movieVerse/movix-logo.svg';
import ContentWrapper from '../contentWrapper/ContentWrapper';

const Header = () => {
  const [show, setShow] = useState('top'); //state for scrolling at home page and top string is classname
  const [lastScrollY, setLastScrollY] = useState(0); //state for scrolling at home page
  const [mobileMenu, setMobileMenu] = useState(false); //state dfor hamburger and search
  const [searchQuery, setSearchQuery] = useState(''); //search query
  const [showSearch, setShowSearch] = useState(''); //to seatch icon option
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    console.log(window.scrollY);
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('hide');
      } else {
        setShow('show');
      }
    } else {
      setShow('top');
    }
    setLastScrollY(window.scrollY);
  };

  // this logic for scrolling and transition
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && searchQuery.length > 0) {
      navigate(`/search/${searchQuery}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie');
    } else {
      navigate('/explore/tv');
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler('movie')}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler('tv')}>
            Tv Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                value={searchQuery}
                placeholder="search for movies or tv shows...."
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
