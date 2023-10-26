import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from '../api/productsAPI.js';

const Products = () => {
  const queryClient = useQueryClient();

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

  const deleteProductMutation = useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log('Product deleted successfully');
      queryClient.invalidateQueries('products');
    },
  });

  const updateProductMutation = useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: updateProduct,
    onSuccess: () => {
      console.log('Product updated successfully');
      queryClient.invalidateQueries('products');
    },
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
      <button
        onClick={() => {
          deleteProductMutation.mutate(product.id);
        }}>
        Delete
      </button>
      <input
        type='checkbox'
        id={product.id}
        checked={product.inStock}
        onChange={(e) => {
          updateProductMutation.mutate({
            ...product,
            inStock: e.target.checked,
          });
        }}
      />
      <label htmlFor={product.id}>In Stock</label>
    </div>
  ));
};
export default Products;
