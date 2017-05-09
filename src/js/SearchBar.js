import React, { Component } from 'react';
import '../css/SearchBar.css';

class SearchBar extends Component {

  render() {
    const { refineSearch } = this.props;
    return (
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Find out who you got!"
          ref="filterGivers"
          onChange={refineSearch}
        />
      </div>
    );
  }
}
SearchBar.propTypes = {
  refineSearch: React.PropTypes.func.isRequired,
}
export default SearchBar;
