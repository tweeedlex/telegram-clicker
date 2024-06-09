import React, { useRef, useState } from 'react';
import mineStyles from "../../../pages/Mine/Mine.module.scss";
import styles from "./CreateCard.module.scss";
import { createCard } from "../../../http/card";

const CreateCard = ({ categoryId, getCards }) => {
  const [cardInfo, setCardInfo] = useState({
    name: "",
    initialPrice: "",
    initialIncome: "",
    categoryId,
    img: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  const createCardForm = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCardInfo({ ...cardInfo, img: file });

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(createCardForm.current);
    formData.append('categoryId', categoryId);
    await createCard(formData);
    await getCards();

    setCardInfo({
      name: "",
      initialPrice: "",
      initialIncome: "",
      categoryId,
      img: null
    });
    setPreviewImage(null);
  };

  return (
    <form ref={createCardForm} onSubmit={handleSubmit} className={mineStyles.card}>
      {previewImage ? (
        <img src={previewImage} alt="Preview" />
      ) : (
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt="Example" />
      )}
      <input
        name="img"
        className={styles.imageInput}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <input
        name="name"
        className={"input-default " + styles.input}
        placeholder="Name"
        value={cardInfo.name}
        onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
      />
      <input
        name="initialPrice"
        className={"input-default " + styles.input}
        placeholder="Initial price"
        type="number"
        value={cardInfo.initialPrice}
        onChange={(e) => setCardInfo({ ...cardInfo, initialPrice: e.target.value })}
      />
      <input
        name="initialIncome"
        className={"input-default " + styles.input}
        placeholder="Initial income"
        type="number"
        value={cardInfo.initialIncome}
        onChange={(e) => setCardInfo({ ...cardInfo, initialIncome: e.target.value })}
      />
      <button type="submit" className="button-default">
        Create new card
      </button>
    </form>
  );
};

export default CreateCard;
