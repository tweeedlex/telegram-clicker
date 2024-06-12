import {useCallback, useState} from "react";
import {getCards} from "../http/card";

const useMemoizedCards = () => {
  const [memoizedCards, setMemoizedCards] = useState({});

  return useCallback(async (category) => {
    if (memoizedCards[category]) {
      return memoizedCards[category];
    } else {
      const cards = await getCards(category);
      setMemoizedCards(prev => ({...prev, [category]: cards}));
      return cards;
    }
  }, [memoizedCards]);
};

export default useMemoizedCards;