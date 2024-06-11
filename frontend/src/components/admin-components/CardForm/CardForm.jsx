import React, { useRef, useState } from 'react';

const CardForm = ({ initialCardInfo, onSubmit, buttonText, styles }) => {
  const [cardInfo, setCardInfo] = useState(initialCardInfo);
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
    await onSubmit(formData);
    setCardInfo(initialCardInfo);
    setPreviewImage(null);
  };

  return (
    <form ref={createCardForm} onSubmit={handleSubmit} className={styles.card}>
      {previewImage ? (
        <img src={previewImage} alt="Preview" />
      ) : (
        <img src={
          initialCardInfo.img
            ? `${(import.meta.env.VITE_API_URL?.split("/api")[0] ?? "")}/img/${initialCardInfo.img}`
            : "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"
        } width={60} alt="Example" />
      )}
      <input
        name="img"
        type="file"
        accept="image/*"
        className={styles.imageInput}
        onChange={handleImageChange}
      />
      <input
        className={"input-default " + styles.input}
        name="name"
        placeholder="Name"
        value={cardInfo.name}
        onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
      />
      <input
        className={"input-default " + styles.input}
        name="initialPrice"
        placeholder="Initial price"
        type="number"
        value={cardInfo.initialPrice}
        onChange={(e) => setCardInfo({ ...cardInfo, initialPrice: e.target.value })}
      />
      <input
        className={"input-default " + styles.input}
        name="initialIncome"
        placeholder="Initial income"
        type="number"
        value={cardInfo.initialIncome}
        onChange={(e) => setCardInfo({ ...cardInfo, initialIncome: e.target.value })}
      />
      <button type="submit" className="button-default">
        {buttonText}
      </button>
    </form>
  );
};

export default CardForm;