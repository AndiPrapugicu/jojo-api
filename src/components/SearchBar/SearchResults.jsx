import "./SearchResults.css";
import SearchList from "./SearchList";
import PropTypes from "prop-types";

function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results.map((result, id) => {
        return <SearchList result={result} key={id} className="list" />;
      })}
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResults;
