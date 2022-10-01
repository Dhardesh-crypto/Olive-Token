import { useState, useEffect } from "react";

const useSearch = (url, search) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data from the endpoint");
        }
        return res.json();
      })
      .then((data) => {

        const searchData = data.filter((item) => item.title.includes(search) || item.body.includes(search));
        console.log('searchData', searchData);
        setData(searchData);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted by user");
        } else {
          setError(err.message);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [url, search]);

  return {
    data,
    isPending,
    error,
  };
};

export default useSearch;
