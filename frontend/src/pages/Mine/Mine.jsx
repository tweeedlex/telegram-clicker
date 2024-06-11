import React, {useEffect, useMemo, useState} from 'react';
import styles from "./Mine.module.scss";
import {getAllCategories} from "../../http/category";
import Debug from "../../components/Debug/Debug";
import {getCards} from "../../http/card";
import {useSelector} from "react-redux";
import CreateCard from "../../components/admin-components/CreateCard/CreateCard";
import EditCard from "../../components/admin-components/EditCard/EditCard";

const Mine = () => {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [cards, setCards] = useState([])
  const isAdmin = useSelector((state) => state.isAdmin)

  useEffect(() => {
    getCategories()
  }, [])

  const handleGetCards = async () => {
    getCards(activeCategory).then(cards => setCards(cards))
  }

  useEffect(() => {
    if (activeCategory) {
      handleGetCards()
    }
  }, [activeCategory]);

  const getCategories = async () => {
    const data = await getAllCategories()
    setCategories(data)
    setActiveCategory(data[0]?._id)
  }

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
                +${card.initialIncome}/s
              </p>
              {
                isAdmin && (
                  <EditCard categoryId={activeCategory} card={card} getCards={handleGetCards} />
                )
              }
            </div>
          ))
        }
        {
          isAdmin && (
            <CreateCard categoryId={activeCategory} getCards={handleGetCards} />
          )
        }
      </div>
    </div>
  );
};

export default Mine;