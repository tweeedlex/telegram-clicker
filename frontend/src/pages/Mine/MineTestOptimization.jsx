import React, { useEffect, useState } from 'react';
import styles from "./Mine.module.scss";
import Debug from "../../components/Debug/Debug";
import { useSelector } from "react-redux";
import CreateCard from "../../components/admin-components/CreateCard/CreateCard";
import EditCard from "../../components/admin-components/EditCard/EditCard";
import useMemoizedCategories from "../../hooks/useMemoizedCategories";
import useMemoizedCards from "../../hooks/useMemoizedCards";

const Mine = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [cards, setCards] = useState([]);
  const isAdmin = useSelector((state) => state.isAdmin);
  const { categories, fetchCategories } = useMemoizedCategories();
  const getMemoizedCards = useMemoizedCards();

  useEffect(() => {
    fetchCategories().then(data => {
      if (data.length > 0) {
        setActiveCategory(data[0]._id);
      }
    });
  }, [fetchCategories]);

  useEffect(() => {
    if (activeCategory) {
      getMemoizedCards(activeCategory).then(setCards);
    }
  }, [activeCategory, getMemoizedCards]);

  return (
    <div className={"page " + styles.minePage}>
      <div className={styles.categories}>
        {
          categories?.map((category) => (
            <button
              key={category._id}
              className={styles.category + " " + (activeCategory === category._id ? styles.active : "")}
              onClick={() => setActiveCategory(category._id)}
            >
              {category.name}
            </button>
          ))
        }
      </div>
      <div className={styles.cards}>
        {
          cards?.map((card) => (
            <div className={styles.card} key={card._id}>
              <img src={
                (import.meta.env.VITE_API_URL?.split("/api")[0] ?? "") + "/img/" + card.img
              } alt={card.name}/>
              <p>
                {card.name}
              </p>
              <p>
                ${card.initialPrice}
              </p>
              <p>
                +${card.initialIncome}/hour
              </p>
              {
                isAdmin && (
                  <EditCard categoryId={activeCategory} card={card} getCards={() => getMemoizedCards(activeCategory).then(setCards)} />
                )
              }
            </div>
          ))
        }
        {
          isAdmin && (
            <CreateCard categoryId={activeCategory} getCards={() => getMemoizedCards(activeCategory).then(setCards)} />
          )
        }
      </div>
    </div>
  );
};

export default Mine;
