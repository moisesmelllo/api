import './App.css';

import { useState, useEffect } from 'react'
import { useFetch } from './hooks/useFetch';
import useDelete from './hooks/useDelete';

const url = 'http://localhost:5000/products'

function App() {
  const [ products, setProducts ] = useState([])
  const [ name, setName] = useState('')
  const [ price, setPrice ] = useState('')


  const { deleteProduct, loading: deleteLoading, error } = useDelete();
  const { data, loading } = useFetch(url)

  useEffect(() => {
    setProducts(data)

  }, [data])


  const handleDelete = async (id) => {
    await deleteProduct(url, id);
    // Optionally, you can update products state here if needed
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
  };



  async function handleSubmit(e) {
    e.preventDefault()

    const product = {
      name,
      price,
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    const addedProduct = await res.json();

    setProducts((prevProducts) => [...prevProducts, addedProduct])

    setName("")
    setPrice("")

  }


  return (
    <div className="App">
      <h1>Lista de produtos</h1>
        {loading && <p>Carregando dados...</p>}
        {!loading && (
          <ul>
        {products && products.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
            <button onClick={() => handleDelete(product.id)}>Remover</button>
          </li>
        ))}
      </ul>
        )}
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>
            NOME:
            <input type="text" value={name} name='name' onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            PREÇO:
            <input type="number" value={price} name='price' onChange={(e) => setPrice(e.target.value)} />
          </label>
          <input type="submit" value='Criar' />
        </form>
      </div>
    </div>
  );
}

export default App;
