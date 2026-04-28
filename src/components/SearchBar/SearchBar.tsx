import * as React from 'react';

import IconSearch from '../../assets/search.svg?react';
import XMarkIcon from '../../assets/xmark.svg?react';

import './SearchBar.css';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container animate-fadeIn" data-name="search-bar" data-file="components/SearchBar.js">
      <div className="search-wrapper">
        <IconSearch width={16} height={16} className="icon-search search-icon" />
        <input
          type="text"
          placeholder="Поиск заметок..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search notes"
          className="search-input"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="search-clear" aria-label="Clear search">
            <XMarkIcon width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
