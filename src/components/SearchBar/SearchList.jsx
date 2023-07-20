import "./SearchList.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchList = ({ result }) => {
  const characterUrl = `/characters/${result.id}`;
  return (
    <div className="search-list">
      <Link to={characterUrl} className="search-link">
        {result.name}
      </Link>
    </div>
  );
};

SearchList.propTypes = {
  result: PropTypes.object.isRequired,
};

export default SearchList;
