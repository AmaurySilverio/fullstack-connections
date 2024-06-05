import axios from "axios";
const baseUrl = "http://localhost:8000/api";

const getTitles = async () => {
  const response = await axios.get(`${baseUrl}/cards`);
  return response.data;
};
const getCustomGame = async (id) => {
  const response = await axios.get(`${baseUrl}/cards/${id}`);
  return response.data;
};
const create = async (newCustomGame) => {
  const response = await axios.post(`${baseUrl}/cards`, newCustomGame);
  console.log(response);
  return response.data;
};

export default { create, getTitles, getCustomGame };
