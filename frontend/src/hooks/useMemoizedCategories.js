import {useCallback, useState} from "react";
import {getAllCategories} from "../http/category";

const useMemoizedCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    if (categories.length === 0) {
      const data = await getAllCategories();
      setCategories(data);
      return data;
    }
    return categories;
  }, [categories]);

  return { categories, fetchCategories };
};

export default useMemoizedCategories;