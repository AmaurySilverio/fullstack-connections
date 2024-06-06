import axios from "axios";
const baseUrl =
  "postgresql://admin:lW0JKBaIWUSygIj3nkSitqtMxufc1W9b@dpg-cpgc2s6ct0pc73db59n0-a.oregon-postgres.render.com/connections_bqpd";

const getTitles = async () => {
  const response = await axios.get(`${import.meta.env.VITE_baseUrl}/cards`);
  return response.data;
};
const getCustomGame = async (id) => {
  const response = await axios.get(`${import.meta.env.VITE_baseUrl}`);
  return response.data;
};
const create = async (newCustomGame) => {
  const response = await axios.post(
    `${import.meta.env.VITE_baseUrl}/cards`,
    newCustomGame
  );
  console.log(response);
  return response.data;
};

export default { create, getTitles, getCustomGame };
