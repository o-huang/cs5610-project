import axios from "axios";
import { getDatabase, ref, get } from "firebase/database";

const getTopLikedCountries = async () => {
  try {
    const database = getDatabase();
    const likesRef = ref(database, "likes");
    const likesSnapshot = await get(likesRef);

    if (likesSnapshot.exists()) {
      const likesData = likesSnapshot.val();

      const likesCount = {};
      Object.values(likesData).forEach((like) => {
        const { alpha3Code } = like;
        likesCount[alpha3Code] = (likesCount[alpha3Code] || 0) + 1;
      });

      const sortedCountries = Object.keys(likesCount).sort(
        (a, b) => likesCount[b] - likesCount[a]
      );

      const top10Countries = sortedCountries.slice(0, 10);

      return top10Countries;
    } else {
      console.log("No likes found in the database");
      return [];
    }
  } catch (error) {
    console.error("Error fetching likes data:", error);
    return [];
  }
};

export const processTopLikedCountries = async () => {
  try {
    const top10Countries = await getTopLikedCountries();

    const countriesResponse = await axios.get(
      "https://restcountries.com/v2/all"
    );
    const countries = countriesResponse.data;

    const topCountriesInfo = top10Countries.map((item) => {
      const country = countries.find((c) => c.alpha3Code === item);
      return { ...country, likeCount: item.likeCount };
    });

    return topCountriesInfo;
  } catch (error) {
    console.error("Error processing top liked countries:", error);
    return [];
  }
};

const getTopCommentedCountries = async () => {
  try {
    const database = getDatabase();
    const commentsRef = ref(database, "comments");
    const commentsSnapshot = await get(commentsRef);

    if (commentsSnapshot.exists()) {
      const commentsData = commentsSnapshot.val();

      const commentsCount = {};

      Object.values(commentsData).forEach((comment) => {
        const { alpha3Code } = comment;
        commentsCount[alpha3Code] = (commentsCount[alpha3Code] || 0) + 1;
      });

      const sortedCountries = Object.keys(commentsCount).sort(
        (a, b) => commentsCount[b] - commentsCount[a]
      );

      const top10Countries = sortedCountries.slice(0, 10);

      return top10Countries;
    } else {
      console.log("No comments found in the database");
      return [];
    }
  } catch (error) {
    console.error("Error fetching comments data:", error);
    return [];
  }
};

export const processTopCommentedCountries = async () => {
  try {
    const top10Countries = await getTopCommentedCountries();

    const countriesResponse = await axios.get(
      "https://restcountries.com/v2/all"
    );
    const countries = countriesResponse.data;

    const topCountriesInfo = top10Countries.map((item) => {
      const country = countries.find((c) => c.alpha3Code === item);
      return { ...country, commentCount: item.commentCount };
    });

    return topCountriesInfo;
  } catch (error) {
    console.error("Error processing top commented countries:", error);
    return [];
  }
};
