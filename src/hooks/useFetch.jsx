import { useState, useEffect } from "react";

// custom hook

export const useFetch = (url) => {
  const [data, setData] = useState(null)

    const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const res = await fetch(url);
      const json = await res.json();

      setData(json);
      setLoading(false)
    };

    fetchData();
  }, [url]);

  return { data, loading };
};