import { TfiPencilAlt } from "react-icons/tfi";
import "./course-card.css";
import { Link } from "react-router-dom";

function CourseCard({ country }) {
  return (
    <div className="col-auto col-min-width">
      <div className="item">
        <Link to={`/country/${country.name}`}>
          <div className="card country-card">
            <div className="card-background-color">
              <img
                src={country.flags.png}
                className="card-img-top img-fluid country-flag-image"
                alt={`${country.name} flag`}
              />
            </div>
            <div className="card-body">
              <h3 className="card-title text-truncate card-main-title">
                {country.name}
              </h3>
              <div className="card-text text-truncate card-sub-title">
                Capital: {country.capital}
              </div>
              <div className="card-text card-term text-truncate card-mini-title">
                Population: {country.population}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
