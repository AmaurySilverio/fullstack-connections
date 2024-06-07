import axios from "axios";
// const baseUrl =
//   "postgres://admin:lW0JKBaIWUSygIj3nkSitqtMxufc1W9b@dpg-cpgc2s6ct0pc73db59n0-a.oregon-postgres.render.com/connections_bqpd";

// const baseUrl = "http://localhost:8000/api";
// const baseUrl = "35.160.120.126";

const getTitles = async () => {
  const response = await axios.get(`${import.meta.env.VITE_baseUrl}api/cards`);
  return response.data;
};
const getCustomGame = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_baseUrl}api/cards/${id}`
  );
  return response.data;
};
const create = async (newCustomGame) => {
  const response = await axios.post(
    `${import.meta.env.VITE_baseUrl}api/cards`,
    newCustomGame
  );
  console.log(response);
  return response.data;
};

export default { create, getTitles, getCustomGame };
