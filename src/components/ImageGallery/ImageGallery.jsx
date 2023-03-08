import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import smoothScroll from 'api/smothScroll';
import { GalleryList } from './ImageGallery.styled';
import { useRef, useEffect } from 'react';

export default function ImageGallery({ photos }) {
  const listRef = useRef();

  useEffect(() => {
    if (listRef) {
      smoothScroll(listRef.current);
    }
  });

  return (
    <GalleryList ref={listRef}>
      {photos.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            imgId={id}
            url={webformatURL}
            alt={tags}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </GalleryList>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
};
