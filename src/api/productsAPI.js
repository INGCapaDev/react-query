// FETCH o AXIOS
import axios from 'axios';

const productsAPI = axios.create({
  baseURL: 'http://localhost:3000/products',
});

export const getProducts = async () => {
  const res = await productsAPI.get('/');
  return res.data;
};

export const addProduct = async (product) =>
  await productsAPI.post('/', product);
