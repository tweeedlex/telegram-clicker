import React, {useEffect, useMemo, useState} from 'react';
import styles from "./Mine.module.scss";
import {getAllCategories} from "../../http/category";
import Debug from "../../components/Debug/Debug";
import {buyCard, deleteCard, getCards} from "../../http/card";
import {useDispatch, useSelector} from "react-redux";
import CreateCard from "../../components/admin-components/CreateCard/CreateCard";
import EditCard from "../../components/admin-components/EditCard/EditCard";
import {setTelegramData} from "../../store/slice";
import gameVariables from "../../consts/gameVariables";

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
    const response = await buyCard(cardId)
    if (response?.error && response?.status === 400) {
      return window.Telegram.WebApp.showPopup({message: response.data.message})
    }

    const {user, newUserCard} = response;

    dispatch(setTelegramData({...telegramData, user}))
    localStorage.setItem("money", user.money)
    localStorage.setItem("energy", user.availableTaps)

    const newCards = cards.map(card => {
      if (card._id === cardId) {
        card.userCard = newUserCard
      }
      return card
    });
    setCards(newCards)
  }

  const handleDeleteCard = async (e, cardId) => {
    e.stopPropagation()
    await deleteCard(cardId)
    await handleGetCards()
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
              <img
                src={
                  (import.meta.env.VITE_API_URL?.split("/api")[0] ?? "") + "/img/" + card.img
                }
                alt=""
              />
              <p>
                {card.name}
              </p>
              <p>
                Price: ${
                card.userCard
                  ? (card.initialPrice * Math.pow(gameVariables.CARD_UPGRADE_MULTIPLIER, card.userCard?.level + 1)).toFixed(2)
                  : card.initialPrice
              }
              </p>
              <p>
                New profit: + ${
                card.userCard
                  ? (card.initialIncome * Math.pow(gameVariables.CARD_INCOME_MULTIPLIER, card.userCard?.level + 1)).toFixed(2)
                  : card.initialIncome
              }/h
              </p>

              {
                card.referralsRequired > 0
                && <p>Referrals required: {card.referralsRequired}</p>
              }

              {
                card.maxLevel > 0
                && <p>Max level: {card.maxLevel}</p>
              }


              <p>
                {card.userCard?.level
                  ? `Level: ${card.userCard?.level}`
                  : "Not purchased"
                }
              </p>
              {
                isAdmin && (
                  <>
                    <EditCard categoryId={activeCategory} card={card} getCards={handleGetCards}/>
                    <button onClick={(e) => handleDeleteCard(e, card._id)} className={"button-default"}>Delete</button>
                  </>
                )
              }
            </div>
          ))
        }
        {
          isAdmin && (
            <CreateCard categoryId={activeCategory} getCards={handleGetCards}/>
          )
        }
      </div>
    </div>
  );
};

export default Mine;