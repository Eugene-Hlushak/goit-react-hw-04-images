import { useEffect, useState } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import * as api from 'api/fetchImg';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    if (query === '') return;
    setLoading(true);
    api
      .getImages(query, page)
      .then(({ data }) => {
        setImages(prev => [...prev, ...data.hits]);
        setBtnVisible(page < Math.ceil(data.totalHits / api.per_page));
      })
      .catch(error => console.log(error))
      .finally(setLoading(false));
  }, [query, page]);

  const getSearchQuery = searchRequest => {
    setQuery(searchRequest);
    setImages([]);
    setPage(1);
    setBtnVisible(false);
  };

  const loadMoreImg = () => {
    setPage(page + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSearch={getSearchQuery} />
      {images.length > 0 && <ImageGallery photos={images} page={page} />}
      {loading && <Loader />}
      {btnVisible ? (
        <LoadMoreBtn showMoreImgs={loadMoreImg} />
      ) : (
        <h3>Sorry, there are no more images</h3>
      )}
    </AppContainer>
  );
}
