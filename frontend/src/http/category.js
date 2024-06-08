import routes from "../consts/api_routes";
import api from "./config";

export const createCategory = async () => {
  try {
    const response = await api.post(routes.CREATE_CATEGORY)
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