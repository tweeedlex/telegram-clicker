import React, {useEffect, useMemo, useState} from 'react';
import styles from "./Mine.module.scss";
import {getAllCategories} from "../../http/category";
import Debug from "../../components/Debug/Debug";
import {buyCard, getCards} from "../../http/card";
import {useDispatch, useSelector} from "react-redux";
import CreateCard from "../../components/admin-components/CreateCard/CreateCard";
import EditCard from "../../components/admin-components/EditCard/EditCard";
import {setTelegramData} from "../../store/slice";

const Mine = () => {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [cards, setCards] = useState([])
  const isAdmin = useSelector((state) => state.isAdmin)
  const telegramData = useSelector((state) => state.telegramData)
  const dispatch = useDispatch()

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

  const handleBuyCard = async (cardId) => {
    const data = await buyCard(cardId)
    if (data?.error && data?.status === 400) {
      return window.Telegram.WebApp.showPopup({message: "Not enough money to buy this card"})
    }

    const {user, newUserCard} = data;
    dispatch(setTelegramData({...telegramData, user}))
    localStorage.setItem("money", user.money)
    localStorage.setItem("energy", user.availableTaps)
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
            <div className={styles.card} key={card._id} onClick={() => handleBuyCard(card._id)}>
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