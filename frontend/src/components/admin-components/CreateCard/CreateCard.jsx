import React from 'react';
import { createCard } from "../../../http/card";
import CardForm from "../CardForm/CardForm";
import styles from "./CreateCard.module.scss";

const CreateCard = ({ categoryId, getCards }) => {
  const handleSubmit = async (formData) => {
    formData.append('categoryId', categoryId);
    await createCard(formData);
    await getCards();
  };

  return (
    <CardForm
      initialCardInfo={{
        name: "",
        initialPrice: "",
        initialIncome: "",
        categoryId,
        img: null
      }}
      onSubmit={handleSubmit}
      buttonText="Create new card"
      styles={styles}
    />
  );
};

export default CreateCard;