import React, { useState, useEffect } from "react";
import CountryCard from "../Card/CourseCard";
function CountryInfo() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );

  useEffect(() => {
    const apiUrl = "https://restcountries.com/v2/all";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    localStorage.setItem("searchTerm", term);
  };


  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row">
        <h1 className="rancho-font">Check Out Your Countries</h1>
      </div>
      <div className="row">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search for a country..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="row">
        {filteredCountries.map((country, index) => (
          
          <CountryCard keyIndex={index} country={country} alpha3Code ={country.alpha3Code}/>
        ))}
      </div>
    </div>
  );
}

export default CountryInfo;
