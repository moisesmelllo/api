import { useState } from 'react';

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProduct = async (url, id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Registro deletado com sucesso!');
      } else {
        setError('Erro ao deletar registro');
      }
    } catch (error) {
      setError('Erro ao deletar registro');
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteProduct,
    loading,
    error,
  };
};

export default useDelete;
