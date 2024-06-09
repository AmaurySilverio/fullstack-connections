import axios from "axios";

const getTitles = async () => {
  const response = await axios.get(`${import.meta.env.VITE_baseUrl}/cards`);
  return response.data;
};
const getCustomGame = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_baseUrl}/cards/${id}`
  );
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
