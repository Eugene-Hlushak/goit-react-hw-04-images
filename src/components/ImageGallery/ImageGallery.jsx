import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import smoothScroll from 'api/smothScroll';
import ImageGalleryItem from './ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export default function ImageGallery({ photos, page }) {
  const listRef = useRef();

  useEffect(() => {
    if (page === 1) {
      return;
    }
    smoothScroll(listRef.current);
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
  page: PropTypes.number.isRequired,
};
