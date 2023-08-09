import React, { useRef } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import PosterFallback from '../../assets/movieVerse/no-poster.png';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
import Image from '../lazyLoadingImage/Image';
import './carousel.scss';

const Carousel = ({ data, loading, endpoint, title }) => {
  const navigate = useNavigate();
  const carouselCountainer = useRef();

  const home = useSelector((state) => state.home);
  const { url } = home;
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  const naviagation = (dir) => {
    const container = carouselCountainer.current;

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className='carouselTitle'>{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => naviagation('left')}
        />

        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => naviagation('right')}
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselCountainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  className="carouselItem"
                  key={item.id}
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Image src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>

                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_Date).format('MMM D, YYYY')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
