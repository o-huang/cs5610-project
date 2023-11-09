import axios from "axios";

const COUNTRIES_URL = "http://localhost:4000/api/countries";
const COMMENT_URL = "http://localhost:4000/api/comments";
export const getTopLikedCountries = async () => {
  const response = await axios.get(`${COUNTRIES_URL}/topLiked`);
  return response.data;
};

export const getTopCommentedCountries = async () => {
  const response = await axios.get(`${COMMENT_URL}/topCommented`);
  console.log(response.data);
  return response.data;
};
