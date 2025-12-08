import { useState, useEffect } from 'react';

export default function useLocalStorage(storageKey, initialValue) {

  const savedData = JSON.parse(localStorage.getItem(storageKey));

  const [data, setData] = useState(savedData ? savedData : initialValue);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}