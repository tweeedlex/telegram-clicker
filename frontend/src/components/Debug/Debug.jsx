import React from 'react';
import api from "../../http/config";

const Debug = ({isVisible}) => {
  const testAdminMiddleware = async () => {
    const response = await api.get("/admin");
    console.log(response)
  }

  const testCreateCategory = async () => {
    const response = await api.post("/admin/category", { name: "Test category" });
    console.log(response)
  }

  const testGetAllCategories = async () => {
    const response = await api.get("/category");
    console.log(response)
  }

  const testRequests = async () => {
    await testGetAllCategories();
  }

  return (
    <>
      {
        isVisible &&
        (
          <div>
            <button
              onClick={() => testRequests()}
            >
              Test request
            </button>
          </div>
        )
      }
    </>
  );
};

export default Debug;