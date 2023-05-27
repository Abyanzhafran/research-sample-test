import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  state = { term: '' };

  onInputChange = (event) => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onFormSubmit(this.state.term);
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field ">
            <label>
              <h1>Search Videos</h1>
            </label>
            <input
              type="text"
              vaue={this.state.term}
              onChange={this.onInputChange}
            />
            <button className="fluid ui red button mt">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
