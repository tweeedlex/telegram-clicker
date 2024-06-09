import React, {useEffect, useState} from 'react';
import styles from "./Mine.module.scss";
import {getAllCategories} from "../../http/category";

const Mine = () => {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    // fetch cards by activeCategory
  }, [activeCategory]);

  const getCategories = async () => {
    const data = await getAllCategories()
    setCategories(data)
    setActiveCategory(data[0]._id)
  }

  return (
    <div className={"page " + styles.minePage}>
      <div className={styles.categories}>
        {
          categories.map((category) => (
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
      <div className={styles.card}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt="slon"/>
          <p>
            Elephant
          </p>
          <p>
            $100
          </p>
          <p>
            +$1/s
          </p>
        </div>
        <div className={styles.card}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt="slon"/>
          <p>
            Elephant
          </p>
          <p>
            $100
          </p>
          <p>
            +$1/s
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mine;