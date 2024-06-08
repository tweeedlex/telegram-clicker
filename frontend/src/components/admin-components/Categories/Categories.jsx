import React, {useEffect, useState} from 'react';
import Modal from "../../Modal/Modal";
import styles from "./Categories.module.scss";
import {createCategory, deleteCategory, getAllCategories} from "../../../http/category";

const Categories = () => {
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    getCategories()
  }, []);

  const getCategories = async () => {
    const data = await getAllCategories()
    setCategories(data)
  }

  const handleCreateCategory = async () => {
    const createdCategory = await createCategory(newCategory)
    setCategories([...categories, createdCategory])
    setNewCategory("")
  }

  const handleDeleteCategory = async (id) => {
    console.log(categories)
    await deleteCategory(id)
    await getCategories()
  }

  return (
    <div>
      <div className={styles.categories}>
        <button
          className={"button-default " + styles.categoriesButton}
          onClick={() => setShowCategoriesModal(true)}
        >
          Manage categories
        </button>
        <Modal
          show={showCategoriesModal} onClose={() => setShowCategoriesModal(false)}
          title="Categories"
        >
          <div className={styles.createCategory}>
            <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder={"Category name..."} className={"input-default " + styles.createCategoryInput} />
            <button
              className={"button-default " + styles.createCategoryButton}
              onClick={handleCreateCategory}
            >
              Create
            </button>
          </div>
          <div className={styles.categoriesList}>
            {
              categories.map((category) => (
                <div key={category._id} className={styles.category}>
                  <div className={styles.categoryName}>{category.name}</div>
                  <div className={styles.categoryActions}>
                    <button
                      className={"button-default " + styles.categoryButton}
                    >
                      Edit name
                    </button>
                    <button
                      className={"button-default " + styles.categoryButton}
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Categories;