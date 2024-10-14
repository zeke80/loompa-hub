import { memo } from "react";
import "./SearchBar.css";

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

function SearchBar({ search, setSearch }: Props) {
  return (
    <div>
      <div className="search-bar d-flex align-items-center input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="icon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="divider"></div>
        <span className="icon-box input-group-text bg-white" id="icon">
          <img
            className="icon"
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png"
            alt="search-icon"
          />
        </span>
      </div>
    </div>
  );
}

export default memo(SearchBar);
