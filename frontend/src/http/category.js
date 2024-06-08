import routes from "../consts/api_routes";
import api from "./config";

export const createCategory = async (name) => {
  try {
    const response = await api.post(routes.ADMIN_CATEGORY, { name })
    return response.data;
  } catch (e) {
    return e;
  }
}

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(routes.ADMIN_CATEGORY, { id })
    return response.data;
  } catch (e) {
    return e;
  }
}

export const getAllCategories = async () => {
  try {
    const response = await api.get(routes.CATEGORY)
    return response.data;
  } catch (e) {
    return e;
  }
}