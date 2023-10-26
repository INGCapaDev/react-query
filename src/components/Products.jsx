import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productsAPI.js';

const Products = () => {
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button>Delete</button>
      <input type='checkbox' checked={product.inStock} />
      <label htmlFor=''>In Stock</label>
    </div>
  ));
};
export default Products;
