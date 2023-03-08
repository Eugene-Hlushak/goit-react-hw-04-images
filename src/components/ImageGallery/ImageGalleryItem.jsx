import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { useState, useEffect } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGallery.styled';

export default function ImageGalleryItem({ imgId, url, alt, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.addEventListener('keydown', closeModalByEsc);
    }

    return () => document.removeEventListener('keydown', closeModalByEsc);
  }, [showModal]);

  const openModal = e => {
    setShowModal(true);
  };

  const closeModalByEsc = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      console.log('need to close modal window');
      setShowModal(false);
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      setShowModal(false);
    }
  };

  return (
    <GalleryItem id={imgId}>
      <GalleryItemImage src={url} alt={alt} onClick={openModal} />
      {showModal && (
        <Modal
          imgUrl={largeImageURL}
          imgAlt={alt}
          clickOnBackdrop={handleBackdropClick}
        />
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  imgId: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
