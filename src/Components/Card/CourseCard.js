import { TfiPencilAlt } from "react-icons/tfi";
import "./course-card.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function CourseCard({ country, keyIndex, alpha3Code }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="col-auto col-min-width">
      <div className="item">
        <Link to={`/detail/${country.name}/${alpha3Code}`}>
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
