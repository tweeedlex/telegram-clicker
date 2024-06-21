import React, { useState } from 'react';
import Modal from "../../Modal/Modal";
import { updateCard } from "../../../http/card";
import CardForm from "../CardForm/CardForm";
import styles from "./EditCard.module.scss";

const EditCard = ({ categoryId, getCards, card }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsModalActive(true);
  };

  const handleSubmit = async (formData) => {
    formData.append('categoryId', categoryId);
    await updateCard(card._id, formData);
    await getCards();
  };

  return (
    <>
      <button className="button-default" onClick={handleEditClick}>Edit card</button>
      <Modal title={`Edit card: ${card.name}`} show={isModalActive} onClose={() => setIsModalActive(false)}>
        <CardForm
          initialCardInfo={{
            name: card.name,
            initialPrice: card.initialPrice,
            initialIncome: card.initialIncome,
            maxLevel: card.maxLevel,
            referralsRequired: card.referralsRequired,
            categoryId,
            img: card.img
          }}
          onSubmit={handleSubmit}
          buttonText="Save edited"
          styles={styles}
        />
      </Modal>
    </>
  );
};

export default EditCard;