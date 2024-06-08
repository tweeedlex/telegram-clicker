import React, {useState} from 'react';
import styles from "./Admin.module.scss";
import Categories from "../../components/admin-components/Categories/Categories";

const Admin = () => {
  return (
    <div className={"page " + styles.adminPage}>
      <h1>Admin page</h1>
      <Categories />
    </div>
  );
};

export default Admin;