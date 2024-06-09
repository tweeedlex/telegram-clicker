import React, {useEffect, useState} from 'react';
import Modal from "../../Modal/Modal";
import styles from "./Categories.module.scss";
import {createCategory, deleteCategory, updateCategory, getAllCategories} from "../../../http/category";

const Categories = () => {
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState("");
  const [editingCategories, setEditingCategories] = useState([]);

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

  useEffect(() => {
    console.log(editingCategories)
  }, [editingCategories]);

  const handleStartEditingCategory = (name, _id) => {
    setEditingCategories([...editingCategories, {_id, name}])
  }

  const handleEditingCategory = (e, _id) => {
    setEditingCategories(editingCategories.map((category) => {
      if (category._id === _id) {
        return {...category, name: e.target.value}
      }
      return category
    }))
  }

  const submitEditingCategory = async (_id) => {
    const editedCategory = editingCategories.find((category) => category._id === _id)
    await updateCategory(editedCategory._id, editedCategory.name)
    setEditingCategories(editingCategories.filter((category) => category._id !== _id))
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
            <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder={"Category name..."}
                   className={"input-default " + styles.createCategoryInput}/>
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
                  {
                    editingCategories.find(editingCategory => editingCategory._id === category._id)
                      ? <input
                        value={editingCategories.find(
                          (editingCategory) => editingCategory._id === category._id
                        ).name}
                        onChange={
                          e => handleEditingCategory(e, category._id)
                        }
                        className={"input-default " + styles.categoryNameInput}
                        placeholder={"New category name..."}
                      />
                      : <div className={styles.categoryName}>{category.name}</div>
                  }
                  <div className={styles.categoryActions}>
                    {editingCategories.find(editingCategory => editingCategory._id === category._id)
                      ? (
                        <button
                          className={"button-default " + styles.categoryButton}
                          onClick={() => submitEditingCategory(category._id)}
                        >
                          Submit
                        </button>
                      )
                      : (
                        <button
                          className={"button-default " + styles.categoryButton}
                          onClick={() => handleStartEditingCategory(category.name, category._id)}
                        >
                          Edit name
                        </button>
                      )
                    }
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