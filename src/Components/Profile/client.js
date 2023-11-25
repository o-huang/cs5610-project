import axios from "axios";
import { getDatabase, ref, get } from "firebase/database";
const getTopLikedCountriesByUser = async (userId) => {
  try {
    const database = getDatabase();
    const likesRef = ref(database, "likes");

    const likesSnapshot = await get(likesRef);

    if (likesSnapshot.exists()) {
      const likesData = likesSnapshot.val();

      const userLikes = Object.values(likesData).filter(
        (like) => like.user === userId
      );

      const alpha3Codes = userLikes.map((item) => item.alpha3Code);
      const alpha3CodesWithoutDuplicates = [...new Set(alpha3Codes)];

      return alpha3CodesWithoutDuplicates;
    } else {
      console.log("No likes found in the database");
      return [];
    }
  } catch (error) {
    console.error("Error fetching likes data:", error);
    return [];
  }
};

export const processUserTopLikedCountries = async (userId) => {
  try {
    const top10Countries = await getTopLikedCountriesByUser(userId);

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

const getTopCommentedCountriesByUser = async (userId) => {
  try {
    const database = getDatabase();
    const commentsRef = ref(database, "comments");

    const commentsSnapshot = await get(commentsRef);

    if (commentsSnapshot.exists()) {
      const commentsData = commentsSnapshot.val();

      const userComments = Object.values(commentsData).filter(
        (comment) => comment.user === userId
      );

      const alpha3Codes = userComments.map((item) => item.alpha3Code);
      const alpha3CodesWithoutDuplicates = [...new Set(alpha3Codes)];

      return alpha3CodesWithoutDuplicates;
    } else {
      console.log("No likes found in the database");
      return [];
    }
  } catch (error) {
    console.error("Error fetching likes data:", error);
    return [];
  }
};

export const processUserTopCommentedCountries = async (userId) => {
  try {
    const top10Countries = await getTopCommentedCountriesByUser(userId);

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
