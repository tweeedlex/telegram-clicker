import React, {useEffect, useMemo, useState} from 'react';
import styles from "./Mine.module.scss";
import {getAllCategories} from "../../http/category";
import Debug from "../../components/Debug/Debug";
import {getCards} from "../../http/card";

const Mine = () => {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [cards, setCards] = useState([])

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    getCards(activeCategory).then(cards => setCards(cards))
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
              {/*<img src={card.img} alt={card.name}/>*/}
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt={card.name}/>
              <p>
                {card.name}
              </p>
              <p>
                ${card.initialPrice}
              </p>
              <p>
                +${card.initialIncome}/s
              </p>
            </div>
          ))
        }


        </div>
    </div>
  );
};

export default Mine;