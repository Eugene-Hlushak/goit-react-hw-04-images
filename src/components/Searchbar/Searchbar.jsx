import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchHeader,
  SearchForm,
  SearchFormButton,
  SearchButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSearch }) {
  const [searchRequest, setSearchRequest] = useState('');

  const startSearch = e => {
    e.preventDefault();
    onSearch(searchRequest);
    setSearchRequest('');
  };

  const changeHandler = e => {
    setSearchRequest(e.target.value);
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={startSearch}>
        <SearchFormButton type="submit">
          <SearchButtonLabel></SearchButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchRequest}
          onChange={changeHandler}
        />
      </SearchForm>
    </SearchHeader>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
