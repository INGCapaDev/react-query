// FETCH o AXIOS
import axios from 'axios';

const productsAPI = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getProducts = async () => {
  const res = await productsAPI.get('/products');
  return res.data;
};
